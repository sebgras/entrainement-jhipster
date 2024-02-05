import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GenreDetailComponent } from './genre-detail.component';

describe('Genre Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: GenreDetailComponent,
              resolve: { genre: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(GenreDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load genre on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', GenreDetailComponent);

      // THEN
      expect(instance.genre).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
