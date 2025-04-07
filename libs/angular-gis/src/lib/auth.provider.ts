import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ProviderOptions } from './provider-options';
import { providers } from './providers';

export function provideAuth(options: ProviderOptions): EnvironmentProviders {
  return makeEnvironmentProviders(providers(options));
}
