import { inject, Injectable } from '@angular/core';
import { GOOGLE_GIS_CLIENT_ID } from './google-gis-client-id.token';
import { GOOGLE_GIS_SCOPE } from './google-gis-scope.token';

@Injectable()
export class AuthService {
  readonly clientId = inject(GOOGLE_GIS_CLIENT_ID);
  readonly scope = inject(GOOGLE_GIS_SCOPE);
}
