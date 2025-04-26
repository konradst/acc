import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAuth } from '@konradst/angular-gis';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAppEnvironment } from './app.environment.provider';
import { APP_ENVIRONMENT } from './app.environment.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    { provide: APP_ENVIRONMENT, useFactory: provideAppEnvironment },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideAuth({
      clientId: '',
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      environment: APP_ENVIRONMENT,
    }),
  ],
};
