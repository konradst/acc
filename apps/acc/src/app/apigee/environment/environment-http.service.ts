import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@konradst/angular-gis';
import { Environment } from './environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentHttpService {
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);

  getEnvironments() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken(),
    });
    return this.httpClient
      .get<{ environments: Environment[] }>(
        'https://apigee.googleapis.com/v1/environments',
        {
          headers,
        }
      )
      .pipe(map((response) => response.environments));
  }
}
