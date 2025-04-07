export interface AuthStrategy {
  isAuthenticated: () => boolean;
  login: () => void;
  logout: () => void;
}
