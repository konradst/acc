import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderOptions } from './provider-options';
import { providers } from './providers';

@NgModule({
  imports: [CommonModule],
})
export class AngularGisModule {
  static forRoot(options: ProviderOptions) {
    return {
      ngModule: AngularGisModule,
      providers: providers(options),
    };
  }
}
