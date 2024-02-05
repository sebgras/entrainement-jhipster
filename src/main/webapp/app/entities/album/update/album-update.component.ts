import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IArtist } from 'app/entities/artist/artist.model';
import { ArtistService } from 'app/entities/artist/service/artist.service';
import { IGenre } from 'app/entities/genre/genre.model';
import { GenreService } from 'app/entities/genre/service/genre.service';
import { AlbumService } from '../service/album.service';
import { IAlbum } from '../album.model';
import { AlbumFormService, AlbumFormGroup } from './album-form.service';

@Component({
  standalone: true,
  selector: 'jhi-album-update',
  templateUrl: './album-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AlbumUpdateComponent implements OnInit {
  isSaving = false;
  album: IAlbum | null = null;

  artistsCollection: IArtist[] = [];
  genresCollection: IGenre[] = [];

  editForm: AlbumFormGroup = this.albumFormService.createAlbumFormGroup();

  constructor(
    protected albumService: AlbumService,
    protected albumFormService: AlbumFormService,
    protected artistService: ArtistService,
    protected genreService: GenreService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareArtist = (o1: IArtist | null, o2: IArtist | null): boolean => this.artistService.compareArtist(o1, o2);

  compareGenre = (o1: IGenre | null, o2: IGenre | null): boolean => this.genreService.compareGenre(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ album }) => {
      this.album = album;
      if (album) {
        this.updateForm(album);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const album = this.albumFormService.getAlbum(this.editForm);
    if (album.id !== null) {
      this.subscribeToSaveResponse(this.albumService.update(album));
    } else {
      this.subscribeToSaveResponse(this.albumService.create(album));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlbum>>): void {
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

  protected updateForm(album: IAlbum): void {
    this.album = album;
    this.albumFormService.resetForm(this.editForm, album);

    this.artistsCollection = this.artistService.addArtistToCollectionIfMissing<IArtist>(this.artistsCollection, album.artist);
    this.genresCollection = this.genreService.addGenreToCollectionIfMissing<IGenre>(this.genresCollection, album.genre);
  }

  protected loadRelationshipsOptions(): void {
    this.artistService
      .query({ filter: 'album-is-null' })
      .pipe(map((res: HttpResponse<IArtist[]>) => res.body ?? []))
      .pipe(map((artists: IArtist[]) => this.artistService.addArtistToCollectionIfMissing<IArtist>(artists, this.album?.artist)))
      .subscribe((artists: IArtist[]) => (this.artistsCollection = artists));

    this.genreService
      .query({ filter: 'album-is-null' })
      .pipe(map((res: HttpResponse<IGenre[]>) => res.body ?? []))
      .pipe(map((genres: IGenre[]) => this.genreService.addGenreToCollectionIfMissing<IGenre>(genres, this.album?.genre)))
      .subscribe((genres: IGenre[]) => (this.genresCollection = genres));
  }
}
