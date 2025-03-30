# angular-gis

This library was generated with [Nx](https://nx.dev).

## Usage

### The module way

```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { AngularGisModule } from '@konradst/angular-gis';

@NgModule({
  imports: [
    AngularGisModule.forRoot({
      clientId: env.GOOGLE_GIS_CLIENT_ID, // your client id env variable (or some other way to get it)
    }),
    // other imports...
  ],
})
export class AppModule {}
```

### The standalone way

```ts
// app.config.ts
import { provideAngularGis } from '@konradst/angular-gis';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAngularGis({
        clientId: env.GOOGLE_GIS_CLIENT_ID, // your client id env variable (or some other way to get it)
    });
    // other providers...
  ],
};
```

## Running unit tests

Run `nx test angular-gis` to execute the unit tests.

## Docs

### GIS (Google Identity Services)

https://developers.google.com/identity/oauth2/web/guides/overview
https://developers.google.com/identity/oauth2/web/guides/migration-to-gis

### GIS typings

https://stackoverflow.com/questions/72238650/how-to-use-google-identity-services-javascript-sdk-with-vue-typescript

### Registering providers in environment injector (the standalone way) tutorial

https://dev.to/railsstudent/how-to-register-providers-in-environment-injector-in-angular-4ehl
