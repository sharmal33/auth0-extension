# auth0-extension

A **user custom extension** for App Studio that integrates the [Auth0](https://auth0.com) SDK
(`react-native-auth0`) — universal login, logout, and stored-credential checks.

The App Studio custom-extension flow pulls this repo, overlays the generated app on top, keeps
`src/extensions/`, merges `package.json` dependencies, and pushes a review branch.

## Contents

| Path | Purpose |
| --- | --- |
| `src/extensions/Auth0Functions.ts` | Custom functions that call `react-native-auth0`. |
| `src/extensions/index.ts` | `CustomFunctionRegistry` + `executeCustomFunction` the app resolves at runtime. |
| `package.json` | Declares the `react-native-auth0` dependency (merged into the app). |

## Functions

| Function | Input | Output | Notes |
| --- | --- | --- | --- |
| `Auth0Functions.login` | `{}` | `{ status, accessToken, userId, email }` | `status` is `'authenticated'` / `'failed'` — the **string routing field**. |
| `Auth0Functions.logout` | `{}` | `{ success }` | Clears the Auth0 session + stored credentials. |
| `Auth0Functions.getCredentials` | `{}` | `{ hasValidCredentials, accessToken }` | Silent check for an existing valid session. |

`status` is a string because response-based routing matches string branch cases
(`${$ext.auth0.login.status = 'authenticated'}`) — a boolean would never match `case 'authenticated'`.

## Declaring it in the app definition

```ts
const auth0 = app.useExtension({
  name: "auth0",
  functions: [
    { name: "login",  input: {}, output: { status: "string", accessToken: "string", userId: "string", email: "string" } },
    { name: "logout", input: {}, output: { success: "boolean" } },
    { name: "getCredentials", input: {}, output: { hasValidCredentials: "boolean", accessToken: "string" } },
  ],
});
```

Trigger from an event (`EventTargetType.USER_EXT`, target `"auth0.login"`) and route on the
result with a branch on `$ext.auth0.login.status`.

## Native / tenant setup

1. Set your tenant: `AUTH0_DOMAIN` and `AUTH0_CLIENT_ID` (env via `react-native-config` /
   inline-env babel plugin, or edit `Auth0Functions.ts`).
2. iOS: add the callback URL scheme to `Info.plist`; run `pod install`.
3. Android: add the `manifestPlaceholders` (`auth0Domain`, `auth0Scheme`) to `build.gradle`.

See the [react-native-auth0 docs](https://github.com/auth0/react-native-auth0) for the full setup.
