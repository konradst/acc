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
import { ApiHttpService } from './api-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Api } from './api';
import { OrganizationStore } from '../organization/organization.store';

interface ApiState {
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

const initialState: ApiState = {
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const ApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities<Api>(),
  withProps(() => ({
    apiHttpService: inject(ApiHttpService),
    organizationStore: inject(OrganizationStore),
  })),
  withMethods((store) => ({
    loadApis: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          const organization = store.organizationStore.selectedOrganization();
          if (!organization) {
            return [];
          }
          return store.apiHttpService.getApis(organization).pipe(
            tapResponse({
              next: (apis) => {
                patchState(
                  store,
                  setEntities(apis, {
                    selectId: (api) => api.name,
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
