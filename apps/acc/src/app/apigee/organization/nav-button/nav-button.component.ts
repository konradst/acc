import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { AuthService } from '@konradst/angular-gis';
import { OrganizationStore } from '../organization.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apigee-organization-nav-button',
  templateUrl: './nav-button.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NavButtonComponent {
  private readonly isAuthenticated = inject(AuthService).isAuthenticated;
  private readonly selectedOrganization =
    inject(OrganizationStore).selectedOrganization;
  private readonly router = inject(Router);

  readonly disabled = computed(() => {
    return !this.isAuthenticated();
  });

  readonly label = computed(() => {
    const selectedOrganization = this.selectedOrganization();
    if (!selectedOrganization) {
      return 'Select organization';
    }
    return `Organization: ${selectedOrganization.organization}`;
  });

  action() {
    this.router.navigate(['apigee', 'organization']);
  }
}
