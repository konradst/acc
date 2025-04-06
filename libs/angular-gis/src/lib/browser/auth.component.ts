import {
  AfterViewInit,
  Component,
  inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { AuthService } from '../auth.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { GoogleTokenResponse, GoogleWindow } from '../gis';

@Component({
  selector: 'lib-angular-gis-browser-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements AfterViewInit {
  readonly authService = inject(AuthService);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView as GoogleWindow;
  private readonly platformId = inject(PLATFORM_ID);

  private initClient() {
    this.authService.client =
      this.window.google.accounts.oauth2.initTokenClient({
        client_id: this.authService.clientId,
        scope: this.authService.scope,
        callback: (tokenResponse: GoogleTokenResponse) => {
          this.authService.accessToken.set(tokenResponse.access_token);
        },
      });
  }

  getToken() {
    this.authService.client?.requestAccessToken();
  }

  revokeToken() {
    const token = this.authService.accessToken();
    if (!token) {
      return;
    }
    this.window.google.accounts.oauth2.revoke(token, () => {
      this.authService.accessToken.set(undefined);
    });
  }

  loadCalendar() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', ' https://apigee.googleapis.com/v1/organizations');
    xhr.setRequestHeader(
      'Authorization',
      'Bearer ' + this.authService.accessToken()
    );
    xhr.send();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadDynamicScript();
    }
  }

  private loadDynamicScript() {
    const script: HTMLScriptElement = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
      this.initClient();
    };
    this.renderer.appendChild(this.document.body, script);
  }
}
