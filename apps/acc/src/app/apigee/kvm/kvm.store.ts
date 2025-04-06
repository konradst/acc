import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { KvmHttpService } from './kvm-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Kvm } from './kvm';
import { OrganizationStore } from '../organization/organization.store';
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
    createKvm: rxMethod<{
      params: KvmParams;
      kvm: Kvm;
    }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((action) => {
          return store.kvmHttpService.createKvm(action.params, action.kvm).pipe(
            tapResponse({
              next: (kvm) => {
                patchState(
                  store,
                  addEntity(kvm, {
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
    deleteKvm: rxMethod<{
      params: KvmParams;
      kvm: Kvm;
    }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((action) => {
          return store.kvmHttpService.deleteKvm(action.params, action.kvm).pipe(
            tapResponse({
              next: (kvm) => {
                patchState(store, removeEntity(kvm.name));
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
