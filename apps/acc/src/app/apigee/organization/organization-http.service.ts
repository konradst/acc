import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@konradst/angular-gis';
import { Organization } from './organization';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrganizationHttpService {
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);

  getOrganizations() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken(),
    });
    return this.httpClient
      .get<{ organizations: Organization[] }>(
        'https://apigee.googleapis.com/v1/organizations',
        {
          headers,
        }
      )
      .pipe(map((response) => response.organizations));
  }
}
