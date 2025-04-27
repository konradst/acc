# Apigee Community Client 1.0.0

## WARNING

CURRENT VERSION SUPPORTS AUTHORIZATION WITH OAUTH IMPLICIT FLOW WHICH MEANS YOUR CLIENT_ID WILL BE SENT FROM SERVER TO CLIENT.
FOR YOUR OWN SAFETY USE IN LOCALHOST OR INTRANET.

IF YOU REALLY NEED USING IT ON A SERVER ACCESSED FROM INTERNET, ENSURE IT'S AT LEAST HTTPS AND ALL SECURE ALL ASSETS WITH AN ADDITIONAL IDENTITY-AWARE PROXY.

(Browser applications use implicit flow this way as there is no magic way to tell browser the client_id but anyways, you have been warned).

Future versions will allow entering client_id or access token in browser without server config.

## Running with Docker

```
docker run -e GOOGLE_GIS_CLIENT_ID="<your_oauth_client_id>" -p 4000:4000 konradst1/acc
```

## Running with NPM

### Install

```bash
npm install
```

### Run (development server)

```bash
GOOGLE_GIS_CLIENT_ID=<your_oauth_client_id> npx nx run acc:serve
```

### Run (production server)

```bash
npx nx run acc:build:production
GOOGLE_GIS_CLIENT_ID=<your_oauth_client_id> node dist/apps/acc/server/server.mjs
```

## Q&A

### Where to get GOOGLE_GIS_CLIENT_ID ?

Go to [Google Auth Platform -> Clients](https://console.cloud.google.com/auth/clients) and setup an OAuth client for your application.

### Is there a docker image in DockerHub?

Go to [konradst1/acc in DockerHub](https://hub.docker.com/r/konradst1/acc).

## Development

Contributors welcome!

### Building Docker images

```bash
docker build -t konradst1/acc:<version> .
```

debug build:

```bash
docker build --progress=plain --no-cache -t konradst1/acc:<version> .
```

push to registry:

```bash
docker push konradst1/acc:<version>
```

### TODO

- Improve UX
- More authorization options

## License

[MIT](./LICENSE.md)
