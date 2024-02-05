import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AlbumDetailComponent } from './album-detail.component';

describe('Album Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: AlbumDetailComponent,
              resolve: { album: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(AlbumDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load album on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AlbumDetailComponent);

      // THEN
      expect(instance.album).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
