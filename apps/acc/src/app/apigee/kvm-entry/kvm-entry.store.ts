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
import { KvmEntryHttpService } from './kvm-entry.http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { KvmEntry } from './kvm-entry';
import { OrganizationStore } from '../organization/organization.store';
import { KvmEntryParams } from './kvm-entry-params';

interface KvmEntryState {
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

const initialState: KvmEntryState = {
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const KvmEntryStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities<KvmEntry>(),
  withProps(() => ({
    kvmEntryHttpService: inject(KvmEntryHttpService),
    organizationStore: inject(OrganizationStore),
  })),
  withMethods((store) => ({
    loadKvms: rxMethod<KvmEntryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((params) => {
          return store.kvmEntryHttpService.getKvmEntries(params).pipe(
            tapResponse({
              next: (kvmEntries) => {
                patchState(
                  store,
                  setEntities(kvmEntries, {
                    selectId: (kvmEntry) => kvmEntry.name,
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
