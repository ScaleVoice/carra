## Setup

Install the dependencies:

```bash
yarn install
```

Replace globally carra with the name of the project.

> Recommendation: use full-text search

We follow these conventions:

- sentry project is named carra-react
- github repo is named carra-web

> Note: Don't add -web or -react to the carra

### Firebase

Setup firebase **DEV**, **STAGE** and **PROD** projects _(might already be set up by BE)_

- Create a new Web application
- Go to: https://console.firebase.google.com/project/PROJECT_NAME/authentication/emails _(Authentication -> Templates)_ and replace all template variables

`https://PROJECT_NAME.firebaseapp.com/__/auth` for \
 `https://PROJECT_NAME.ENV.cleevio.dev/auth`

> Note: ENV = devel, staging

- Fill in .env.local, .env.development, .env.staging with firebase project settings

> Note: Production setup is going to be added later

### Sentry

Create a new project: https://sentry.cleevio.io/organizations/cleevio/projects/new/

- Project name: carra-react
- Project platform: React
- Fill in .env.local, .env.development, .env.staging with sentry DSN

## Spin it up!

> Note: Project is automatically deployed on push to main branch

Start the dev server:

```bash
yarn dev
```

Build the app for production:

```bash
yarn build
```
