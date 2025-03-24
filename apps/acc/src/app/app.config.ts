import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAuth } from '@konradst/angular-gis';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAuth({
      clientId:
        '2823289439-lnanojvb908r3f9nfsq541hfqefn822v.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/cloud-platform',
    }),
  ],
};
