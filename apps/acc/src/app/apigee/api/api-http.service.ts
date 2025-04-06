import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@konradst/angular-gis';
import { Api } from './api';
import { map } from 'rxjs/operators';
import { Organization } from '../organization/organization';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);

  getApis(organization: Organization) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken(),
    });
    return this.httpClient
      .get<{ proxies: Api[] }>(
        `https://apigee.googleapis.com/v1/organizations/${organization.organization}/apis`,
        {
          headers,
        }
      )
      .pipe(map((response) => response.proxies));
  }
}
