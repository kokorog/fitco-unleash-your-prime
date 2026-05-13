// FITCO — site visibility mode
// Toggle STEALTH_MODE to false when ready to launch publicly.
export const STEALTH_MODE = true;

// Access password for dev/admin preview while in stealth.
// Visit /access and enter this password to unlock the real site on this device.
// NOTE: This is a soft client-side gate — do not rely on it for protecting
// truly secret data. Keep sensitive logic on the server / behind auth.
export const ACCESS_PASSWORD = "fitco-dev-2026";

export const ACCESS_STORAGE_KEY = "fitco-access-granted";
export const ACCESS_TOKEN = "granted";

export function isStealthUnlockedClient(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(ACCESS_STORAGE_KEY) === ACCESS_TOKEN;
  } catch {
    return false;
  }
}

export function unlockStealth() {
  try {
    window.localStorage.setItem(ACCESS_STORAGE_KEY, ACCESS_TOKEN);
  } catch {}
}

export function lockStealth() {
  try {
    window.localStorage.removeItem(ACCESS_STORAGE_KEY);
  } catch {}
}