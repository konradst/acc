import { Injectable } from '@angular/core';
import { AuthService as AbstractAuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends AbstractAuthService {
  login() {
    return;
  }

  logout() {
    return;
  }
}
