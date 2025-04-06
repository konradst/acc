import {
  AfterViewInit,
  Component,
  inject,
  PLATFORM_ID,
  Renderer2,
  signal,
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
  
  // UI state signals
  isLoading = signal(false);
  isCalendarLoading = signal(false);
  errorMessage = signal<string | null>(null);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleAuthScript();
    }
  }

  /**
   * Initializes the Google OAuth client
   */
  private initClient(): void {
    try {
      this.authService.client =
        this.window.google.accounts.oauth2.initTokenClient({
          client_id: this.authService.clientId,
          scope: this.authService.scope,
          callback: this.handleAuthCallback.bind(this),
        });
    } catch (error) {
      this.handleError('Failed to initialize Google client', error);
    }
  }

  /**
   * Handles the OAuth token response
   */
  private handleAuthCallback(tokenResponse: GoogleTokenResponse): void {
    this.isLoading.set(false);
    this.errorMessage.set(null);
    this.authService.accessToken.set(tokenResponse.access_token);
  }

  /**
   * Requests a new auth token from Google
   */
  getToken(): void {
    try {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.authService.client?.requestAccessToken();
    } catch (error) {
      this.isLoading.set(false);
      this.handleError('Authentication failed', error);
    }
  }

  /**
   * Revokes the current auth token
   */
  revokeToken(): void {
    const token = this.authService.accessToken();
    if (!token) {
      return;
    }
    
    try {
      this.isLoading.set(true);
      this.window.google.accounts.oauth2.revoke(token, () => {
        this.authService.accessToken.set(undefined);
        this.isLoading.set(false);
      });
    } catch (error) {
      this.isLoading.set(false);
      this.handleError('Failed to logout', error);
    }
  }

  /**
   * Loads calendar data as an example API call
   */
  loadCalendar(): void {
    const token = this.authService.accessToken();
    if (!token) {
      this.errorMessage.set('Not authenticated. Please login first.');
      return;
    }
    
    try {
      this.isCalendarLoading.set(true);
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://apigee.googleapis.com/v1/organizations');
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      
      xhr.onload = () => {
        this.isCalendarLoading.set(false);
        if (xhr.status === 200) {
          console.log('Calendar data loaded successfully', JSON.parse(xhr.responseText));
        } else {
          this.handleError(`API request failed with status: ${xhr.status}`, xhr.responseText);
        }
      };
      
      xhr.onerror = () => {
        this.isCalendarLoading.set(false);
        this.handleError('Network error while loading calendar data');
      };
      
      xhr.send();
    } catch (error) {
      this.isCalendarLoading.set(false);
      this.handleError('Failed to load calendar data', error);
    }
  }

  /**
   * Loads the Google authentication script
   */
  private loadGoogleAuthScript(): void {
    const script: HTMLScriptElement = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      this.initClient();
    };
    
    script.onerror = () => {
      this.handleError('Failed to load Google authentication script');
    };
    
    this.renderer.appendChild(this.document.body, script);
  }
  
  /**
   * Handles and logs errors
   */
  private handleError(message: string, error: any = null): void {
    this.errorMessage.set(message);
    console.error(message, error);
  }
}
