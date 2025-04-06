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

  constructor() {
    this.reload();
  }

  add() {
    console.log('add');
  }

  delete(kvm: Kvm) {
    console.log('delete', kvm);
  }

  reload() {
    this.kvmStore.loadKvms({
      organizationName: this.route.snapshot.params['organizationName'],
      apiName: this.route.snapshot.params['apiName'],
      environmentName: this.route.snapshot.params['environmentName'],
    });
  }

  listEntries(kvm: Kvm) {
    console.log(kvm);
    this.router.navigate([kvm.name, 'entry'], { relativeTo: this.route });
  }
}
