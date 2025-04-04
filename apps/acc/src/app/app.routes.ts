import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { AuthService } from '@konradst/angular-gis';

export const appRoutes: Route[] = [
  {
    path: 'apigee/organization/select',
    canMatch: [() => inject(AuthService).isAuthenticated()],
    loadComponent: () =>
      import('./apigee/organization/select/select.component').then(
        (m) => m.SelectComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];
