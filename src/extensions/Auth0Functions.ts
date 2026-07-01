// react-native-auth0 is a dependency (see package.json). This user-owned custom code CALLS the SDK.
// The extension contract is input -> output (no navigation / app internals).
import Auth0 from 'react-native-auth0';

// Configure with your Auth0 tenant. Set AUTH0_DOMAIN / AUTH0_CLIENT_ID via env
// (react-native-config or an inline-env babel plugin), or replace the placeholders below.
// You must also add the Auth0 callback/native config to iOS Info.plist & AndroidManifest.
const auth0 = new Auth0({
  domain: process.env.AUTH0_DOMAIN ?? 'YOUR_AUTH0_DOMAIN',
  clientId: process.env.AUTH0_CLIENT_ID ?? 'YOUR_AUTH0_CLIENT_ID',
});

/**
 * Auth0Functions — Auth0 authentication.
 *
 * Matches the `auth0` extension declaration:
 *   login() -> { status, accessToken, userId, email }   // `status` is the string routing field
 *   logout() -> { success }
 *   getCredentials() -> { hasValidCredentials, accessToken }
 * Registered in ./index.ts.
 */
export class Auth0Functions {
  /** Universal-login via the system browser, then fetch the user profile. */
  static login = async (_input: {}): Promise<{
    status: string;
    accessToken: string;
    userId: string;
    email: string;
  }> => {
    try {
      const creds = await auth0.webAuth.authorize({
        scope: 'openid profile email',
      });
      const user = await auth0.auth.userInfo({ token: creds.accessToken });
      return {
        status: 'authenticated',
        accessToken: creds.accessToken,
        userId: user.sub ?? '',
        email: user.email ?? '',
      };
    } catch (e) {
      console.warn('[Auth0Functions] login failed', e);
      return { status: 'failed', accessToken: '', userId: '', email: '' };
    }
  };

  /** Clear the Auth0 session (system browser) and stored credentials. */
  static logout = async (_input: {}): Promise<{ success: boolean }> => {
    try {
      await auth0.webAuth.clearSession();
      await auth0.credentialsManager.clearCredentials();
      return { success: true };
    } catch (e) {
      console.warn('[Auth0Functions] logout failed', e);
      return { success: false };
    }
  };

  /** Whether the user already has valid (non-expired) stored credentials. */
  static getCredentials = async (_input: {}): Promise<{
    hasValidCredentials: boolean;
    accessToken: string;
  }> => {
    try {
      const has = await auth0.credentialsManager.hasValidCredentials();
      if (!has) return { hasValidCredentials: false, accessToken: '' };
      const creds = await auth0.credentialsManager.getCredentials();
      return { hasValidCredentials: true, accessToken: creds.accessToken };
    } catch {
      return { hasValidCredentials: false, accessToken: '' };
    }
  };
}
