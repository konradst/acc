import { computed, inject, Injectable, signal } from '@angular/core';
import { GOOGLE_GIS_CLIENT_ID } from './google-gis-client-id.token';
import { GOOGLE_GIS_SCOPE } from './google-gis-scope.token';
import { GoogleTokenClient } from './gis';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly clientId = inject(GOOGLE_GIS_CLIENT_ID);
  readonly scope = inject(GOOGLE_GIS_SCOPE);

  client?: GoogleTokenClient;

  accessToken = signal<string | undefined>(undefined);
  isAuthenticated = computed(() => !!this.accessToken());
}
