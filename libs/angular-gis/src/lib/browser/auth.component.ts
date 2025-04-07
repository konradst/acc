import {
  AfterViewInit,
  Component,
  effect,
  inject,
  PLATFORM_ID,
  Renderer2,
  signal,
} from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthService as BrowserAuthService } from './auth.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'lib-angular-gis-browser-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements AfterViewInit {
  readonly authService = inject(AuthService) as BrowserAuthService;
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  // UI state signals
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    effect(() => this.handleLoginEffect());
  }

  private handleLoginEffect() {
    const isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn) {
      this.isLoading.set(false);
      this.errorMessage.set(null);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleAuthScript();
    }
  }

  /**
   * Requests a new auth token from Google
   */
  login(): void {
    try {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.authService.login();
    } catch (error) {
      this.isLoading.set(false);
      this.handleError('Authentication failed', error);
    }
  }

  /**
   * Revokes the current auth token
   */
  logout(): void {
    try {
      this.isLoading.set(true);
      this.authService.logout();
    } catch (error) {
      this.handleError('Failed to logout', error);
    } finally {
      this.isLoading.set(false);
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
   * Initializes the Google OAuth client
   */
  private initClient(): void {
    try {
      this.authService.initClient();
    } catch (error) {
      this.handleError('Failed to initialize Google client', error);
    }
  }

  /**
   * Handles and logs errors
   */
  private handleError(message: string, error?: unknown): void {
    this.errorMessage.set(message);
    console.error(message, error);
  }
}
