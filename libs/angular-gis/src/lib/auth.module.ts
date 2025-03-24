import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GOOGLE_GIS_CLIENT_ID } from './google-gis-client-id.token';
import { AuthService } from './auth.service';
import { GOOGLE_GIS_SCOPE } from './google-gis-scope.token';
import { ProviderOptions } from './provider-options';

@NgModule({
  imports: [CommonModule],
})
export class AngularGisModule {
  static forRoot(options: ProviderOptions) {
    return {
      ngModule: AngularGisModule,
      providers: [
        {
          provide: GOOGLE_GIS_CLIENT_ID,
          useValue: options.clientId,
        },
        {
          provide: GOOGLE_GIS_SCOPE,
          useValue: options.scope,
        },
        AuthService,
      ],
    };
  }
}
