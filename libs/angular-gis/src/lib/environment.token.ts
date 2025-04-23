import { InjectionToken } from '@angular/core';

export const ENVIRONMENT = new InjectionToken<{
  GOOGLE_GIS_SCOPE?: string;
  GOOGLE_GIS_CLIENT_ID?: string;
  GOOGLE_GIS_CLIENT_SECRET?: string;
}>('ENVIRONMENT');
