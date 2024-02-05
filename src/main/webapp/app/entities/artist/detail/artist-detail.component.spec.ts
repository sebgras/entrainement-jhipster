import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ArtistDetailComponent } from './artist-detail.component';

describe('Artist Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ArtistDetailComponent,
              resolve: { artist: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ArtistDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load artist on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ArtistDetailComponent);

      // THEN
      expect(instance.artist).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
