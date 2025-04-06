import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KvmEntryStore } from '../kvm-entry.store';
import { KvmEntryHttpService } from '../kvm-entry.http.service';
import { KvmEntry } from '../kvm-entry';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  providers: [KvmEntryHttpService],
  selector: 'app-kvmgee-kvm-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  readonly kvmEntryStore = inject(KvmEntryStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  showAddModal = false;

  constructor() {
    this.reload();
  }

  reload() {
    this.kvmEntryStore.loadKvms(this.params());
  }

  add() {
    this.showAddModal = true;
  }

  create(kvmEntry: KvmEntry) {
    this.kvmEntryStore.createKvmEntry({
      kvmEntry,
      params: this.params(),
    });
  }

  update(kvmEntry: KvmEntry, value: string) {
    this.kvmEntryStore.updateKvmEntry({
      kvmEntry: { ...kvmEntry, value },
      params: this.params(),
    });
  }

  delete(kvmEntry: KvmEntry) {
    this.kvmEntryStore.deleteKvmEntry({
      kvmEntry,
      params: this.params(),
    });
  }

  private params() {
    return {
      organizationName: this.route.snapshot.params['organizationName'],
      kvmName: this.route.snapshot.params['kvmName'],
      apiName: this.route.snapshot.params['apiName'],
      environmentName: this.route.snapshot.params['environmentName'],
    };
  }
}
