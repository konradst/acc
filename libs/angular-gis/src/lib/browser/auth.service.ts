import { Injectable, inject } from '@angular/core';
import { AuthService as AbstractAuthService } from '../auth.service';
import { DOCUMENT } from '@angular/common';
import { GoogleTokenResponse, GoogleWindow } from '../gis';

@Injectable({ providedIn: 'root' })
export class AuthService extends AbstractAuthService {
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView as GoogleWindow;

  login() {
    if (!this.client) {
      throw new Error('Client not initialized');
    }
    this.client.requestAccessToken();
  }

  logout() {
    const token = this.accessToken();
    if (!token) {
      throw new Error('No access token found');
    }
    this.window.google.accounts.oauth2.revoke(token, () => {
      this.accessToken.set(undefined);
    });
  }

  initClient() {
    this.client = this.window.google.accounts.oauth2.initTokenClient({
      client_id: this.clientId(),
      scope: this.scope(),
      callback: (tokenResponse: GoogleTokenResponse) => {
        this.accessToken.set(tokenResponse.access_token);
      },
    });
  }
}
