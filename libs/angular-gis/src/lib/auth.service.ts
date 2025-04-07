import { computed, inject, Injectable, signal } from '@angular/core';
import { GOOGLE_GIS_CLIENT_ID } from './google-gis-client-id.token';
import { GOOGLE_GIS_CLIENT_SECRET } from './google-gis-client-secret.token';
import { GOOGLE_GIS_SCOPE } from './google-gis-scope.token';
import { GoogleTokenClient } from './gis';
import { AuthStrategy } from './auth-strategy';

@Injectable({ providedIn: 'root' })
export abstract class AuthService implements AuthStrategy {
  protected client?: GoogleTokenClient;

  protected readonly clientId = signal(inject(GOOGLE_GIS_CLIENT_ID));
  protected readonly clientSecret = signal(inject(GOOGLE_GIS_CLIENT_SECRET));
  protected readonly scope = signal(inject(GOOGLE_GIS_SCOPE));

  readonly accessToken = signal<string | undefined>(undefined);

  readonly isAuthenticated = computed(() => !!this.accessToken());

  abstract login(): void;

  abstract logout(): void;
}
