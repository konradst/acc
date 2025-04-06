import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@konradst/angular-gis';
import { Environment } from './environment';
import { map } from 'rxjs/operators';
import { Organization } from '../organization/organization';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentHttpService {
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);

  getEnvironments(organization: Organization) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken(),
    });
    return this.httpClient
      .get<Environment['environment'][]>(
        `https://apigee.googleapis.com/v1/organizations/${organization.organization}/environments`,
        {
          headers,
        }
      )
      .pipe(
        map((response) =>
          response.map((environment) => ({
            environment,
          }))
        )
      );
  }
}
