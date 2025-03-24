import {
  AfterViewInit,
  Component,
  inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { AuthService } from '../auth.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'ng-gis-browser-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements AfterViewInit {
  readonly authService = inject(AuthService);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  //   initClient() {
  //     this.authService.client = google.accounts.oauth2.initTokenClient({
  //       client_id:
  //         '2823289439-lnanojvb908r3f9nfsq541hfqefn822v.apps.googleusercontent.com',
  //       scope: 'https://www.googleapis.com/auth/cloud-platform',
  //       callback: (tokenResponse) => {
  //         access_token = tokenResponse.access_token;
  //     },
  //   });
  // }
  //   getToken() {
  //     client.requestAccessToken();
  //   }

  //   revokeToken() {
  //     google.accounts.oauth2.revoke(access_token, () => {
  //       console.log('access token revoked');
  //     });
  //   }

  //   loadCalendar() {
  //     var xhr = new XMLHttpRequest();
  //     xhr.open('GET', ' https://apigee.googleapis.com/v1/organizations');
  //     xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
  //     xhr.send();
  //   }

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
      console.log('loaded');
      (
        this.document.defaultView as Window &
          typeof globalThis & { initClient: () => void }
      ).initClient();
    };
    this.renderer.appendChild(this.document.body, script);
  }
}
