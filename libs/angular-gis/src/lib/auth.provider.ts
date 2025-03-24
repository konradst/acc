import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ProviderOptions } from './provider-options';
import { GOOGLE_GIS_CLIENT_ID } from './google-gis-client-id.token';
import { AuthService } from './auth.service';
import { GOOGLE_GIS_SCOPE } from './google-gis-scope.token';

export function provideAuth(
  options: ProviderOptions = {
    clientId: (() => {
      throw new Error('clientId is required for GIS auth');
    })(),
    scope: (() => {
      throw new Error('scope is required for GIS auth');
    })(),
  }
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: GOOGLE_GIS_CLIENT_ID,
      useValue: options.clientId,
    },
    {
      provide: GOOGLE_GIS_SCOPE,
      useValue: options.scope,
    },
    AuthService,
  ]);
}
