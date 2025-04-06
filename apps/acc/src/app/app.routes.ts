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
    path: 'apigee/organization/:organizationName/keyvaluemap',
    canMatch: [
      () =>
        inject(AuthService).isAuthenticated() &&
        inject(OrganizationStore).selectedOrganization(),
    ],
    loadComponent: () =>
      import('./apigee/kvm/list/list.component').then((m) => m.ListComponent),
  },
  {
    path: 'apigee/organization/:organizationName/keyvaluemap/:kvmName/entry',
    canMatch: [
      () =>
        inject(AuthService).isAuthenticated() &&
        inject(OrganizationStore).selectedOrganization(),
    ],
    loadComponent: () =>
      import('./apigee/kvm-entry/list/list.component').then(
        (m) => m.ListComponent
      ),
  },
  {
    path: 'apigee/organization/:organizationName/api',
    canMatch: [
      () =>
        inject(AuthService).isAuthenticated() &&
        inject(OrganizationStore).selectedOrganization(),
    ],
    loadComponent: () =>
      import('./apigee/api/list/list.component').then((m) => m.ListComponent),
  },
  {
    path: 'apigee/organization/:organizationName/environment',
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
  { pathMatch: 'full', path: '', redirectTo: 'dashboard' },
  // { path: '**', redirectTo: 'dashboard' },
];
