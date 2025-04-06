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

  add() {
    this.showAddModal = true;
  }

  delete(kvm: KvmEntry) {
    console.log('delete', kvm);
  }

  reload() {
    this.kvmEntryStore.loadKvms({
      organizationName: this.route.snapshot.params['organizationName'],
      kvmName: this.route.snapshot.params['kvmName'],
      apiName: this.route.snapshot.params['apiName'],
      environmentName: this.route.snapshot.params['environmentName'],
    });
  }

  save(kvmEntry: KvmEntry) {
    console.log(kvmEntry);
  }
}
