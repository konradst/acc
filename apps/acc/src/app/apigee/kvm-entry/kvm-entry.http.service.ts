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
   * @todo nextPageToken
   * @param kvmParams
   * @returns
   */
  getKvmEntries(kvmEntryParams: KvmEntryParams) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken(),
    });
    return this.httpClient.get<{
      keyValueEntries: KvmEntry[];
      nextPageToken: string;
    }>(
      `https://apigee.googleapis.com/v1/${this.kvmsEntriesUrl(
        kvmEntryParams
      )}?pageSize=100${
        kvmEntryParams.nextPageToken
          ? `&pageToken=${kvmEntryParams.nextPageToken}`
          : ''
      }`,
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
  updateKvmEntry(kvmEntryParams: KvmEntryParams, kvmEntry: KvmEntry) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken(),
    });
    return this.httpClient.put<KvmEntry>(
      `https://apigee.googleapis.com/v1/${this.kvmsEntriesUrl(
        kvmEntryParams
      )}/${kvmEntry.name}`,
      kvmEntry,
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
  createKvmEntry(kvmEntryParams: KvmEntryParams, kvmEntry: KvmEntry) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken(),
    });
    return this.httpClient.post<KvmEntry>(
      `https://apigee.googleapis.com/v1/${this.kvmsEntriesUrl(kvmEntryParams)}`,
      kvmEntry,
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
  deleteKvmEntry(kvmEntryParams: KvmEntryParams, kvmEntry: KvmEntry) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken(),
    });
    return this.httpClient.delete<KvmEntry>(
      `https://apigee.googleapis.com/v1/${this.kvmsEntriesUrl(
        kvmEntryParams
      )}/${kvmEntry.name}`,
      {
        headers,
      }
    );
  }

  /**
   * creates url kvmsEntriesUrl for organization, api, environment
   * @param {KvmEntryParams} kvmEntryParams params
   * @returns {string} url
   */
  private kvmsEntriesUrl(kvmEntryParams: KvmEntryParams) {
    let url = 'organizations/' + kvmEntryParams.organizationName;
    if (kvmEntryParams.apiName) {
      url += '/apis/' + kvmEntryParams.apiName;
    }
    if (kvmEntryParams.environmentName) {
      url += '/environments/' + kvmEntryParams.environmentName;
    }
    url += '/keyvaluemaps/' + kvmEntryParams.kvmName + '/entries';
    return url;
  }
}
