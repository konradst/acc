// Gemini helped here
// src/app/env.provider.ts (or a suitable location)
import { inject, PLATFORM_ID, TransferState } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { AppEnvironment, ENVIRONMENT_STATE_KEY } from './app.environment.token'; // Adjust imports

export function provideAppEnvironment(): AppEnvironment {
  const transferState = inject(TransferState);
  const platformId = inject(PLATFORM_ID);

  // Check if we already have the state in TransferState (running on client after transfer)
  if (transferState.hasKey(ENVIRONMENT_STATE_KEY)) {
    const env = transferState.get(ENVIRONMENT_STATE_KEY, {
      GOOGLE_GIS_SCOPE: undefined,
      GOOGLE_GIS_CLIENT_ID: undefined,
      GOOGLE_GIS_CLIENT_SECRET: undefined,
    }); // Provide default if key exists but value is null/undefined somehow
    // IMPORTANT: Remove the key once read to prevent memory leaks
    transferState.remove(ENVIRONMENT_STATE_KEY);
    return env;
  }

  // If not in TransferState, we are either on the server or on the client before hydration state is checked (less common)
  if (isPlatformServer(platformId)) {
    // --- SERVER SIDE ---
    // Access environment variables. Ensure they exist on your server!
    // Use default values defensively.
    const serverEnv: AppEnvironment = {
      // IMPORTANT: Only include variables safe to expose to the client!
      // NEVER put sensitive secrets like API keys with write access here.
      GOOGLE_GIS_SCOPE: process.env['GOOGLE_GIS_SCOPE'], // Example: PUBLIC_API_URL should be set in your server environment
      GOOGLE_GIS_CLIENT_ID: process.env['GOOGLE_GIS_CLIENT_ID'],
      GOOGLE_GIS_CLIENT_SECRET: process.env['GOOGLE_GIS_CLIENT_SECRET'],
    };

    // Store the data in TransferState for the client
    transferState.set(ENVIRONMENT_STATE_KEY, serverEnv);

    // Return the value for immediate use on the server render
    return serverEnv;
  } else {
    // --- CLIENT SIDE (Fallback / Before Hydration Check) ---
    // This block might run on the client if accessed very early, before TransferState is checked above,
    // or if something went wrong with the transfer. Return default/empty values.
    // Ideally, the `hasKey` check at the top handles the primary client path.
    return {
      GOOGLE_GIS_SCOPE: undefined,
      GOOGLE_GIS_CLIENT_ID: undefined,
      GOOGLE_GIS_CLIENT_SECRET: undefined,
    };
  }
}
