import { Component, inject } from '@angular/core';
import { OrganizationStore } from '../organization.store';
import { OrganizationHttpService } from '../organization-http.service';
import { Organization } from '../organization';

@Component({
  providers: [OrganizationHttpService],
  selector: 'app-apigee-organization-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  readonly organizationStore = inject(OrganizationStore);

  constructor() {
    this.reload();
  }

  reload() {
    this.organizationStore.loadOrganizations();
  }

  selectOrganization(organization: Organization) {
    this.organizationStore.selectOrganization(organization);
  }
}
