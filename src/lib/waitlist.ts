export type WaitlistGoal = "LOSE_WEIGHT" | "MAINTAIN" | "GAIN_MUSCLE" | "ENDURANCE" | "UNKNOWN";
export type WaitlistLanguage = "BG" | "EN";

export type WaitlistInput = {
  email: string;
  name?: string;
  goal: WaitlistGoal;
  language: WaitlistLanguage;
  marketingConsent: boolean;
  privacyAccepted: boolean;
};

export async function submitWaitlistSignup(values: WaitlistInput) {
  const apiBaseUrl =
    (import.meta.env.VITE_FITCO_API_BASE_URL as string | undefined) || "https://api.fitcoapp.com/api/v1";

  const params = new URLSearchParams(window.location.search);

  const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: values.email,
      name: values.name || undefined,
      goal: values.goal || "UNKNOWN",
      preferredLanguage: values.language || "BG",
      marketingConsent: Boolean(values.marketingConsent),
      privacyAccepted: Boolean(values.privacyAccepted),
      source: "fitcoapp.com",
      metadata: {
        pagePath: window.location.pathname,
        browserLanguage: navigator.language,
        submittedAt: new Date().toISOString(),
        utmSource: params.get("utm_source") || undefined,
        utmMedium: params.get("utm_medium") || undefined,
        utmCampaign: params.get("utm_campaign") || undefined,
        utmContent: params.get("utm_content") || undefined,
        utmTerm: params.get("utm_term") || undefined,
      },
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.message || "WAITLIST_SUBMIT_FAILED");
  return payload;
}
