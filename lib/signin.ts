// Signing in with an email code – shared by the server, the pages and the Privacy Policy.

export const SIGNIN = {
  /** How long a sign-in code is valid. */
  codeMinutes: 10,
  /** Wrong attempts after which a code stops working. */
  maxAttempts: 5,
  /** How long the session cookie keeps you signed in. */
  sessionDays: 180,
  cookies: {
    /** Signed, httpOnly: who is signed in. */
    session: "gmqr_session",
    /** Signed, httpOnly: the sign-in in progress (between requesting and entering the code). */
    login: "gmqr_login",
  },
} as const;
