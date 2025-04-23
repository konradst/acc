// src/app/env.token.ts (or a suitable location)
import { InjectionToken, makeStateKey } from '@angular/core';

// Example: Interface for multiple variables
export interface AppEnvironment {
  GOOGLE_GIS_CLIENT_ID?: string;
  GOOGLE_GIS_CLIENT_SECRET?: string;
  GOOGLE_GIS_SCOPE?: string;
  // Add other non-sensitive variables needed on the client
}

// Define the Injection Token using the interface
export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>(
  'APP_ENVIRONMENT'
);

// Create a StateKey typed with your interface or variable type
export const ENVIRONMENT_STATE_KEY =
  makeStateKey<AppEnvironment>('environmentState');

// Or for a single variable:
// export const API_URL_STATE_KEY = makeStateKey<string>('apiUrlState');
