import { useSyncExternalStore } from "react";

// The email address last used at checkout on this device: it pre-fills the payment and the sign-in form.

const KEY = "gmqr:email";

function read() {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

const noSubscription = () => () => {};

/** Read after hydration (the server cannot see it), so the server and the first client render match. */
export const useRememberedEmail = () => useSyncExternalStore(noSubscription, read, () => "");

export function rememberEmail(email: string) {
  try {
    localStorage.setItem(KEY, email);
  } catch {
    // private mode – not needed
  }
}
