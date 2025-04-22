import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@konradst/angular-gis';
import { Kvm } from './kvm';
import { map } from 'rxjs/operators';
import { KvmParams } from './kvm-params';

@Injectable({
  providedIn: 'root',
})
export class KvmHttpService {
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);

  /**
   * @todo api and environment kvms
   * @param kvmParams
   * @returns
   */
  getKvms(kvmParams: KvmParams) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken(),
    });
    return this.httpClient
      .get<Kvm['name'][]>(
        `https://apigee.googleapis.com/v1/${this.kvmsUrl(kvmParams)}`,
        {
          headers,
        }
      )
      .pipe(
        map((response) =>
          response.map((kvm) => ({
            name: kvm,
          }))
        )
      );
  }

  /**
   * @todo api and environment entries
   * @param kvmParams
   * @returns
   */
  createKvm(kvmParams: KvmParams, kvm: Kvm) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken(),
    });
    return this.httpClient.post<Kvm>(
      `https://apigee.googleapis.com/v1/${this.kvmsUrl(kvmParams)}`,
      kvm,
      {
        headers,
      }
    );
  }

  /**
   * @todo api and environment entries
   * @param kvmParams
   * @returns
   */
  deleteKvm(kvmParams: KvmParams, kvm: Kvm) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken(),
    });
    return this.httpClient.delete<Kvm>(
      `https://apigee.googleapis.com/v1/${this.kvmsUrl(kvmParams)}/${kvm.name}`,
      {
        headers,
      }
    );
  }

  /**
   * creates url kvmsUrl for organization, api, environment
   * @param {KvmParams} kvmParams params
   * @returns {string} url
   */
  private kvmsUrl(kvmParams: KvmParams) {
    let url = 'organizations/' + kvmParams.organizationName;
    if (kvmParams.apiName) {
      url += '/apis/' + kvmParams.apiName;
    }
    if (kvmParams.environmentName) {
      url += '/environments/' + kvmParams.environmentName;
    }
    url += '/keyvaluemaps';
    return url;
  }
}
