# Acc

## WARNING

CURRENT VERSION SUPPORTS AUTHORIZATION WITH OAUTH IMPLICIT FLOW WHICH MEANS YOUR CLIENT_ID WILL BE SENT FROM SERVER TO CLIENT.
FOR YOUR OWN SAFETY USE IN LOCALHOST OR INTRANET.

IF YOU REALLY NEED USING IT ON A SERVER ACCESSED FROM INTERNET, ENSURE IT'S AT LEAST HTTPS AND ALL SECURE ALL ASSETS WITH AN ADDITIONAL IDENTITY-AWARE PROXY.

(Browser applications use implicit flow this way as there is no magic way to tell browser the client_id but anyways, you have been warned).

Future versions will allow entering client_id or access token in browser without server config.

## Run

### Install

```bash
npm install
```

### Run

```bash
GOOGLE_GIS_SCOPE="https://www.googleapis.com/auth/cloud-platform" GOOGLE_GIS_CLIENT_ID=<your_client_id> npx nx run acc:serve
```

## License

MIT

No warranty, No liability, No support.

## Open Source

Contributors welcome!

## TODO

- Docker
- Improve UX
