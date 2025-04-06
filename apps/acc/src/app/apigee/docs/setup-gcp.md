# GCP project setup

## Create a project

New Gmail users get free GCP credits and Apigee trial for a limited time.

## Configure OAuth 

We're using OAuth for JS client application.
We'll need only consent screen and client ID credentials.
We won't configure API keys or service accounts in version 1.
We won't publish our app (we'll add test users).

1. [Configure consent screen](https://developers.google.com/workspace/guides/configure-oauth-consent)
2. [Configure client ID credentials](https://developers.google.com/workspace/guides/create-credentials#oauth-client-id)
3. Provide the client ID and scope in the Angular application:
    - `GOOGLE_GIS_CLIENT_ID` - takie it from the [Credentials](https://console.cloud.google.com/apis/credentials) configured in step 1.
    - `GOOGLE_GIS_SCOPE` - for apigee it's `https://www.googleapis.com/auth/cloud-platform`


## Setup Apigee X

1. Use the eval org creation [Wizard](https://cloud.google.com/apigee/docs/api-platform/get-started/overview-eval)
