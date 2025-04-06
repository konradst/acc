import { Component, inject } from '@angular/core';
import { OrganizationStore } from '../organization.store';
import { OrganizationHttpService } from '../organization-http.service';
import { Organization } from '../organization';
import { Router } from '@angular/router';

@Component({
  providers: [OrganizationHttpService],
  selector: 'app-apigee-organization-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  readonly organizationStore = inject(OrganizationStore);
  private readonly router = inject(Router);

  constructor() {
    this.reload();
  }

  reload() {
    this.organizationStore.loadOrganizations();
  }

  selectOrganization(organization: Organization) {
    this.organizationStore.selectOrganization(organization);
  }

  selectOrganizationListKVMs(organization: Organization) {
    this.organizationStore.selectOrganization(organization);
    this.router.navigate([
      'apigee',
      'organization',
      organization.organization,
      'keyvaluemap',
    ]);
  }

  selectOrganizationListAPIs(organization: Organization) {
    this.organizationStore.selectOrganization(organization);
    this.router.navigate([
      'apigee',
      'organization',
      organization.organization,
      'api',
    ]);
  }

  selectOrganizationListEnvironments(organization: Organization) {
    this.organizationStore.selectOrganization(organization);
    this.router.navigate([
      'apigee',
      'organization',
      organization.organization,
      'environment',
    ]);
  }
}
