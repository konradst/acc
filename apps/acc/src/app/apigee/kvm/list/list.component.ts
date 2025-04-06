import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KvmStore } from '../kvm.store';
import { KvmHttpService } from '../kvm-http.service';
import { Kvm } from '../kvm';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  providers: [KvmHttpService],
  selector: 'app-kvmgee-kvm-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  readonly kvmStore = inject(KvmStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  showAddModal = false;

  constructor() {
    this.reload();
  }

  add() {
    this.showAddModal = true;
  }

  create(kvm: Kvm) {
    this.kvmStore.createKvm({ params: this.params(), kvm });
  }

  delete(kvm: Kvm) {
    this.kvmStore.deleteKvm({ params: this.params(), kvm });
  }

  reload() {
    this.kvmStore.loadKvms(this.params());
  }

  listEntries(kvm: Kvm) {
    this.router.navigate([kvm.name, 'entry'], { relativeTo: this.route });
  }

  private params() {
    return {
      organizationName: this.route.snapshot.params['organizationName'],
      apiName: this.route.snapshot.params['apiName'],
      environmentName: this.route.snapshot.params['environmentName'],
    };
  }
}
