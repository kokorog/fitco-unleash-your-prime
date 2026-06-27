import { createFileRoute } from "@tanstack/react-router";

import { AccountDeletionPage } from "@/components/site/AccountDeletionPage";

export const Route = createFileRoute("/delete-account")({
  head: () => ({
    meta: [
      { title: "Delete FitCo account" },
      { name: "description", content: "Request permanent deletion of your FitCo account and associated data." },
      { property: "og:url", content: "https://fitcoapp.com/delete-account" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/delete-account" }],
  }),
  component: () => <AccountDeletionPage mode="account" />,
});
