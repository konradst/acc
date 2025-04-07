import {
  EnvironmentProviders,
  inject,
  PLATFORM_ID,
  Provider,
} from '@angular/core';
import { AuthService } from './auth.service';
import { GOOGLE_GIS_CLIENT_ID } from './google-gis-client-id.token';
import { GOOGLE_GIS_CLIENT_SECRET } from './google-gis-client-secret.token';
import { GOOGLE_GIS_SCOPE } from './google-gis-scope.token';
import { isPlatformBrowser } from '@angular/common';
import { AuthService as BrowserAuthService } from './browser/auth.service';
import { AuthService as ServerAuthService } from './server/auth.service';
import { ProviderOptions } from './provider-options';

export const providers: (
  options: ProviderOptions
) => (Provider | EnvironmentProviders)[] = (options) => [
  {
    provide: GOOGLE_GIS_CLIENT_ID,
    useValue: options.clientId,
  },
  {
    provide: GOOGLE_GIS_CLIENT_SECRET,
    useValue: options.clientSecret,
  },
  {
    provide: GOOGLE_GIS_SCOPE,
    useValue: options.scope,
  },
  {
    provide: AuthService,
    useFactory: () => {
      const platformId = inject(PLATFORM_ID);
      if (isPlatformBrowser(platformId)) {
        return new BrowserAuthService();
      } else {
        return new ServerAuthService();
      }
    },
    deps: [PLATFORM_ID],
  },
];
