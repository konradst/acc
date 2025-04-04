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
import { OrganizationHttpService } from './organization-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Organization } from './organization';

interface OrganizationState {
  selectedOrganization: Organization | null;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

const initialState: OrganizationState = {
  selectedOrganization: null,
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const OrganizationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities<Organization>(),
  withProps(() => ({
    organizationHttpService: inject(OrganizationHttpService),
  })),
  withMethods((store) => ({
    selectOrganization(selectedOrganization: Organization): void {
      patchState(store, { selectedOrganization });
    },
    loadOrganizations: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return store.organizationHttpService.getOrganizations().pipe(
            tapResponse({
              next: (organizations) => {
                patchState(
                  store,
                  setEntities(organizations, {
                    selectId: (organization) => organization.organization,
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
