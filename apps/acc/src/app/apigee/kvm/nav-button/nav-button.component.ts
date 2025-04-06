import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { AuthService } from '@konradst/angular-gis';
import { Router } from '@angular/router';
import { OrganizationStore } from '../../organization/organization.store';

@Component({
  selector: 'app-kvmgee-kvm-nav-button',
  templateUrl: './nav-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavButtonComponent {
  private readonly isAuthenticated = inject(AuthService).isAuthenticated;
  private readonly selectedOrganization =
    inject(OrganizationStore).selectedOrganization;
  private readonly router = inject(Router);

  readonly disabled = computed(() => {
    return !this.isAuthenticated() || !this.selectedOrganization();
  });

  readonly label = computed(() => {
    return 'List kvms';
  });

  action() {
    const organization = this.selectedOrganization()?.organization;
    if (!organization) {
      throw new Error('No organization selected');
    }
    this.router.navigate(['apigee', 'organization', organization, 'kvm']);
  }
}
