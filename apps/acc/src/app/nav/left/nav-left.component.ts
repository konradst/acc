import { Component } from '@angular/core';
import { NavButtonComponent as OrganizationNavButtonComponent } from '../../apigee/organization/nav-button/nav-button.component';
import { NavButtonComponent as EnvironmentNavButtonComponent } from '../../apigee/environment/nav-button/nav-button.component';
import { NavButtonComponent as ApiNavButtonComponent } from '../../apigee/api/nav-button/nav-button.component';

@Component({
  imports: [
    OrganizationNavButtonComponent,
    EnvironmentNavButtonComponent,
    ApiNavButtonComponent,
  ],
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
})
export class NavLeftComponent {}
