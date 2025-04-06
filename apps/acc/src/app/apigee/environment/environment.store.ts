import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { EnvironmentHttpService } from './environment-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Environment } from './environment';
import { OrganizationStore } from '../organization/organization.store';

interface EnvironmentState {
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

const initialState: EnvironmentState = {
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const EnvironmentStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities<Environment>(),
  withProps(() => ({
    environmentHttpService: inject(EnvironmentHttpService),
    organizationStore: inject(OrganizationStore),
  })),
  withMethods((store) => ({
    loadEnvironments: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          const organization = store.organizationStore.selectedOrganization();
          if (!organization) {
            return [];
          }
          return store.environmentHttpService
            .getEnvironments(organization)
            .pipe(
              tapResponse({
                next: (environments) => {
                  patchState(
                    store,
                    setEntities(environments, {
                      selectId: (environment) => environment.environment,
                    })
                  );
                },
                error: (error: HttpErrorResponse) =>
                  patchState(store, { error: error.message }),
                finalize: () => patchState(store, { isLoading: false }),
              })
            );
        })
      )
    ),
  }))
);
