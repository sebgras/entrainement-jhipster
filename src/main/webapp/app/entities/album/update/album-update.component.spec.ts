import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IArtist } from 'app/entities/artist/artist.model';
import { ArtistService } from 'app/entities/artist/service/artist.service';
import { IGenre } from 'app/entities/genre/genre.model';
import { GenreService } from 'app/entities/genre/service/genre.service';
import { IAlbum } from '../album.model';
import { AlbumService } from '../service/album.service';
import { AlbumFormService } from './album-form.service';

import { AlbumUpdateComponent } from './album-update.component';

describe('Album Management Update Component', () => {
  let comp: AlbumUpdateComponent;
  let fixture: ComponentFixture<AlbumUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let albumFormService: AlbumFormService;
  let albumService: AlbumService;
  let artistService: ArtistService;
  let genreService: GenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), AlbumUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AlbumUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlbumUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    albumFormService = TestBed.inject(AlbumFormService);
    albumService = TestBed.inject(AlbumService);
    artistService = TestBed.inject(ArtistService);
    genreService = TestBed.inject(GenreService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call artist query and add missing value', () => {
      const album: IAlbum = { id: 456 };
      const artist: IArtist = { id: 4827 };
      album.artist = artist;

      const artistCollection: IArtist[] = [{ id: 24006 }];
      jest.spyOn(artistService, 'query').mockReturnValue(of(new HttpResponse({ body: artistCollection })));
      const expectedCollection: IArtist[] = [artist, ...artistCollection];
      jest.spyOn(artistService, 'addArtistToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ album });
      comp.ngOnInit();

      expect(artistService.query).toHaveBeenCalled();
      expect(artistService.addArtistToCollectionIfMissing).toHaveBeenCalledWith(artistCollection, artist);
      expect(comp.artistsCollection).toEqual(expectedCollection);
    });

    it('Should call genre query and add missing value', () => {
      const album: IAlbum = { id: 456 };
      const genre: IGenre = { id: 20617 };
      album.genre = genre;

      const genreCollection: IGenre[] = [{ id: 7630 }];
      jest.spyOn(genreService, 'query').mockReturnValue(of(new HttpResponse({ body: genreCollection })));
      const expectedCollection: IGenre[] = [genre, ...genreCollection];
      jest.spyOn(genreService, 'addGenreToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ album });
      comp.ngOnInit();

      expect(genreService.query).toHaveBeenCalled();
      expect(genreService.addGenreToCollectionIfMissing).toHaveBeenCalledWith(genreCollection, genre);
      expect(comp.genresCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const album: IAlbum = { id: 456 };
      const artist: IArtist = { id: 25142 };
      album.artist = artist;
      const genre: IGenre = { id: 20064 };
      album.genre = genre;

      activatedRoute.data = of({ album });
      comp.ngOnInit();

      expect(comp.artistsCollection).toContain(artist);
      expect(comp.genresCollection).toContain(genre);
      expect(comp.album).toEqual(album);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlbum>>();
      const album = { id: 123 };
      jest.spyOn(albumFormService, 'getAlbum').mockReturnValue(album);
      jest.spyOn(albumService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ album });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: album }));
      saveSubject.complete();

      // THEN
      expect(albumFormService.getAlbum).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(albumService.update).toHaveBeenCalledWith(expect.objectContaining(album));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlbum>>();
      const album = { id: 123 };
      jest.spyOn(albumFormService, 'getAlbum').mockReturnValue({ id: null });
      jest.spyOn(albumService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ album: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: album }));
      saveSubject.complete();

      // THEN
      expect(albumFormService.getAlbum).toHaveBeenCalled();
      expect(albumService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlbum>>();
      const album = { id: 123 };
      jest.spyOn(albumService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ album });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(albumService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareArtist', () => {
      it('Should forward to artistService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(artistService, 'compareArtist');
        comp.compareArtist(entity, entity2);
        expect(artistService.compareArtist).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareGenre', () => {
      it('Should forward to genreService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(genreService, 'compareGenre');
        comp.compareGenre(entity, entity2);
        expect(genreService.compareGenre).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
