import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'artist',
    data: { pageTitle: 'entrainementJhipsterApp.artist.home.title' },
    loadChildren: () => import('./artist/artist.routes'),
  },
  {
    path: 'genre',
    data: { pageTitle: 'entrainementJhipsterApp.genre.home.title' },
    loadChildren: () => import('./genre/genre.routes'),
  },
  {
    path: 'track',
    data: { pageTitle: 'entrainementJhipsterApp.track.home.title' },
    loadChildren: () => import('./track/track.routes'),
  },
  {
    path: 'album',
    data: { pageTitle: 'entrainementJhipsterApp.album.home.title' },
    loadChildren: () => import('./album/album.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
