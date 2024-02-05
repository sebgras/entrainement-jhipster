import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAlbum } from 'app/entities/album/album.model';
import { AlbumService } from 'app/entities/album/service/album.service';
import { ITrack } from '../track.model';
import { TrackService } from '../service/track.service';
import { TrackFormService, TrackFormGroup } from './track-form.service';

@Component({
  standalone: true,
  selector: 'jhi-track-update',
  templateUrl: './track-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TrackUpdateComponent implements OnInit {
  isSaving = false;
  track: ITrack | null = null;

  albumsSharedCollection: IAlbum[] = [];

  editForm: TrackFormGroup = this.trackFormService.createTrackFormGroup();

  constructor(
    protected trackService: TrackService,
    protected trackFormService: TrackFormService,
    protected albumService: AlbumService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareAlbum = (o1: IAlbum | null, o2: IAlbum | null): boolean => this.albumService.compareAlbum(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ track }) => {
      this.track = track;
      if (track) {
        this.updateForm(track);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const track = this.trackFormService.getTrack(this.editForm);
    if (track.id !== null) {
      this.subscribeToSaveResponse(this.trackService.update(track));
    } else {
      this.subscribeToSaveResponse(this.trackService.create(track));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrack>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(track: ITrack): void {
    this.track = track;
    this.trackFormService.resetForm(this.editForm, track);

    this.albumsSharedCollection = this.albumService.addAlbumToCollectionIfMissing<IAlbum>(this.albumsSharedCollection, track.album);
  }

  protected loadRelationshipsOptions(): void {
    this.albumService
      .query()
      .pipe(map((res: HttpResponse<IAlbum[]>) => res.body ?? []))
      .pipe(map((albums: IAlbum[]) => this.albumService.addAlbumToCollectionIfMissing<IAlbum>(albums, this.track?.album)))
      .subscribe((albums: IAlbum[]) => (this.albumsSharedCollection = albums));
  }
}
