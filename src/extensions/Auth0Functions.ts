// react-native-auth0 v5 is a dependency (see package.json). This user-owned code CALLS the SDK.
// The extension contract is input -> output only (no navigation / app internals).
//
// Ported from 101digital/auth0-react-native-app (frontend/src/context/AuthContext.js). That app uses
// the `useAuth0()` React hook; extension functions are HEADLESS (plain async, no React), so the same
// flows are implemented with the imperative `Auth0` CLIENT class instead:
//   useAuth0().sendSMSCode / authorizeWithSMS  ->  auth0.auth.passwordlessWithSMS / loginWithSMS
//   useAuth0().authorize                        ->  auth0.webAuth.authorize
//   useAuth0().getCredentials / hasValidCredentials / clearCredentials -> auth0.credentialsManager.*
// The hook auto-persists tokens; the class API does not, so we call saveCredentials() after login.
import Auth0 from 'react-native-auth0';
import { auth0Config } from './config';

const auth0 = new Auth0({
  domain: auth0Config.domain,
  clientId: auth0Config.clientId,
});

// audience is optional; only pass it when configured (empty string trips some flows).
const audience = auth0Config.audience || undefined;

/**
 * Auth0Functions — passwordless SMS OTP + Universal Login.
 *
 * Matches the `auth0` extension declaration:
 *   sendPhoneOtp({ phone })          -> { status }                              // 'sent' | 'failed'
 *   verifyPhoneOtp({ phone, code })  -> { status, accessToken, userId, email }  // 'authenticated' | 'failed'
 *   login({ signup?, connection? })  -> { status, accessToken, userId, email }  // Universal Login
 *   logout()                         -> { success }
 *   getCredentials()                 -> { hasValidCredentials, accessToken }
 * The `status` string fields drive response-based routing. Registered in ./index.ts.
 */
export class Auth0Functions {
  /**
   * Native passwordless — step 1: text a one-time code to the phone number.
   * (Auth0 -> Twilio SMS; requires the Passwordless SMS connection + the "Passwordless OTP" grant.)
   */
  static sendPhoneOtp = async (input: {
    phone: string;
  }): Promise<{ status: string }> => {
    try {
      await auth0.auth.passwordlessWithSMS({
        phoneNumber: input.phone,
        send: 'code',
      });
      return { status: 'sent' };
    } catch (e) {
      console.warn('[Auth0Functions] sendPhoneOtp failed', e);
      return { status: 'failed' };
    }
  };

  /**
   * Native passwordless — step 2: verify the code -> tokens. First successful verify CREATES the
   * user, later ones LOG IN. Persists the credentials so getCredentials() works on next launch.
   */
  static verifyPhoneOtp = async (input: {
    phone: string;
    code: string;
  }): Promise<{
    status: string;
    accessToken: string;
    userId: string;
    email: string;
  }> => {
    try {
      const creds = await auth0.auth.loginWithSMS({
        phoneNumber: input.phone,
        code: input.code,
        audience,
        scope: auth0Config.scope,
      });
      await auth0.credentialsManager.saveCredentials(creds);
      const user = await auth0.auth.userInfo({ token: creds.accessToken });
      return {
        status: 'authenticated',
        accessToken: creds.accessToken,
        userId: user.sub ?? '',
        email: user.email ?? '',
      };
    } catch (e) {
      console.warn('[Auth0Functions] verifyPhoneOtp failed', e);
      return { status: 'failed', accessToken: '', userId: '', email: '' };
    }
  };

  /**
   * Universal Login — Auth0's hosted page (phone-as-identifier connection by default).
   * `signup: true` lands on the Sign Up tab; `connection` overrides the DB connection.
   */
  static login = async (input: {
    signup?: boolean;
    connection?: string;
  }): Promise<{
    status: string;
    accessToken: string;
    userId: string;
    email: string;
  }> => {
    try {
      const creds = await auth0.webAuth.authorize({
        audience,
        scope: auth0Config.scope,
        connection: input.connection ?? auth0Config.phoneConnection,
        ...(input.signup
          ? { additionalParameters: { screen_hint: 'signup' } }
          : {}),
      });
      await auth0.credentialsManager.saveCredentials(creds);
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

  /**
   * Clear the stored tokens locally (no browser). The native passwordless flow has no Auth0 web
   * session to clear, so clearCredentials() is used instead of the browser-based clearSession().
   */
  static logout = async (_input: {}): Promise<{ success: boolean }> => {
    try {
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
