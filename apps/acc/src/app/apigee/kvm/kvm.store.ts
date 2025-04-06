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
import { KvmHttpService } from './kvm-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Kvm } from './kvm';
import { OrganizationStore } from '../organization/organization.store';
import { Organization } from '../organization/organization';
import { Api } from '../api/api';
import { Environment } from '../environment/environment';
import { KvmParams } from './kvm-params';

interface KvmState {
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

const initialState: KvmState = {
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const KvmStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities<Kvm>(),
  withProps(() => ({
    kvmHttpService: inject(KvmHttpService),
    organizationStore: inject(OrganizationStore),
  })),
  withMethods((store) => ({
    loadKvms: rxMethod<KvmParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((params) => {
          return store.kvmHttpService.getKvms(params).pipe(
            tapResponse({
              next: (kvms) => {
                patchState(
                  store,
                  setEntities(kvms, {
                    selectId: (kvm) => kvm.name,
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
