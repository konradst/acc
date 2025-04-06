import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { AuthService } from '@konradst/angular-gis';

export const appRoutes: Route[] = [
  {
    path: 'apigee/organization/list',
    canMatch: [() => inject(AuthService).isAuthenticated()],
    loadComponent: () =>
      import('./apigee/organization/list/list.component').then(
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
  { path: '**', redirectTo: 'dashboard' },
];
