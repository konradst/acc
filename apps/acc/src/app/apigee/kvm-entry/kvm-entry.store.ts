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
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
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
        switchMap((meta) => {
          return store.kvmEntryHttpService.getKvmEntries(meta).pipe(
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
    updateKvmEntry: rxMethod<{
      params: KvmEntryParams;
      kvmEntry: KvmEntry;
    }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((action) => {
          return store.kvmEntryHttpService
            .updateKvmEntry(action.params, action.kvmEntry)
            .pipe(
              tapResponse({
                next: (kvmEntry) => {
                  patchState(
                    store,
                    updateEntity(
                      {
                        id: kvmEntry.name,
                        changes: kvmEntry,
                      },
                      {
                        selectId: (kvmEntry) => kvmEntry.name,
                      }
                    )
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
    createKvmEntry: rxMethod<{
      params: KvmEntryParams;
      kvmEntry: KvmEntry;
    }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((action) => {
          return store.kvmEntryHttpService
            .createKvmEntry(action.params, action.kvmEntry)
            .pipe(
              tapResponse({
                next: (kvmEntry) => {
                  patchState(
                    store,
                    addEntity(kvmEntry, {
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
    deleteKvmEntry: rxMethod<{
      params: KvmEntryParams;
      kvmEntry: KvmEntry;
    }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((action) => {
          return store.kvmEntryHttpService
            .deleteKvmEntry(action.params, action.kvmEntry)
            .pipe(
              tapResponse({
                next: (kvmEntry) => {
                  patchState(store, removeEntity(kvmEntry.name));
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
