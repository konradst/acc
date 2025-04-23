import { InjectionToken } from '@angular/core';

export interface ProviderOptions {
  clientId?: string;
  clientSecret?: string;
  scope?: string;
  environment?: InjectionToken<{
    GOOGLE_GIS_SCOPE?: string;
    GOOGLE_GIS_CLIENT_ID?: string;
    GOOGLE_GIS_CLIENT_SECRET?: string;
  }>;
}
