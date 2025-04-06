import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { AuthService } from '@konradst/angular-gis';
import { OrganizationStore } from './apigee/organization/organization.store';

export const appRoutes: Route[] = [
  {
    path: 'apigee/organization',
    canMatch: [() => inject(AuthService).isAuthenticated()],
    loadComponent: () =>
      import('./apigee/organization/list/list.component').then(
        (m) => m.ListComponent
      ),
  },
  {
    path: 'apigee/organization/:organization/environment',
    canMatch: [
      () =>
        inject(AuthService).isAuthenticated() &&
        inject(OrganizationStore).selectedOrganization(),
    ],
    loadComponent: () =>
      import('./apigee/environment/list/list.component').then(
        (m) => m.ListComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  // { path: '**', redirectTo: 'dashboard' },
];
