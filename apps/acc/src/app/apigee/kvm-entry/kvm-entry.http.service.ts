import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@konradst/angular-gis';
import { KvmEntry } from './kvm-entry';
import { map } from 'rxjs/operators';
import { KvmEntryParams } from './kvm-entry-params';

@Injectable({
  providedIn: 'root',
})
export class KvmEntryHttpService {
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);

  /**
   * @todo api and environment entries
   * @param kvmParams
   * @returns
   */
  getKvmEntries(kvmEntryParams: KvmEntryParams) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken(),
    });
    return this.httpClient
      .get<{
        keyValueEntries: KvmEntry[];
        nextPageToken: string;
      }>(
        `https://apigee.googleapis.com/v1/organizations/${kvmEntryParams.organizationName}/keyvaluemaps/${kvmEntryParams.kvmName}/entries`,
        {
          headers,
        }
      )
      .pipe(map((response) => response.keyValueEntries));
  }
}
