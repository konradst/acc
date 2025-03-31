import { Component, inject } from '@angular/core';
import { AuthService } from '@konradst/angular-gis';
import { OrganizationStore } from './organization.store';
import { OrganizationHttpService } from './organization-http.service';
import { Organization } from './organization';

@Component({
  providers: [OrganizationStore, OrganizationHttpService],
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss',
})
export class OrganizationComponent {
  readonly authService = inject(AuthService);
  readonly organizationStore = inject(OrganizationStore);

  reload() {
    this.organizationStore.loadOrganizations();
  }

  selectOrganization(organization: Organization) {
    this.organizationStore.selectOrganization(organization);
  }
}
