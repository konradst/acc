/// <reference types="google.accounts" />

// window
export type GoogleWindow = Window &
  typeof globalThis & {
    google: GoogleTokenClient;
  };

// oauth2
export type GoogleClientConfigError = google.accounts.oauth2.ClientConfigError;
export type GoogleTokenResponse = google.accounts.oauth2.TokenResponse;
export type GoogleCodeResponse = google.accounts.oauth2.CodeResponse;
export type GoogleTokenClientConfig = google.accounts.oauth2.TokenClientConfig;
export type GoogleCodeClientConfig = google.accounts.oauth2.CodeClientConfig;
export type GoogleTokenClient = google.accounts.oauth2.TokenClient;
export type GoogleCodeClient = google.accounts.oauth2.CodeClient;
export type GoogleOverridableTokenClientConfig =
  google.accounts.oauth2.OverridableTokenClientConfig;

// id
export type GoogleGsiButtonConfiguration =
  google.accounts.id.GsiButtonConfiguration;
export type GoogleIdConfiguration = google.accounts.id.IdConfiguration;
export type GooglePromptMomentNotification =
  google.accounts.id.PromptMomentNotification;
export type GoogleCredentialResponse = google.accounts.id.CredentialResponse;
export type GoogleCredential = google.accounts.id.Credential;
export type GoogleRevocationResponse = google.accounts.id.RevocationResponse;
