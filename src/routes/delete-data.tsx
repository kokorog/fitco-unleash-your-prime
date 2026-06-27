import { createFileRoute } from "@tanstack/react-router";

import { AccountDeletionPage } from "@/components/site/AccountDeletionPage";

export const Route = createFileRoute("/delete-data")({
  head: () => ({
    meta: [
      { title: "Delete FitCo data" },
      { name: "description", content: "Request deletion of specific FitCo data or permanently delete your account." },
      { property: "og:url", content: "https://fitcoapp.com/delete-data" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/delete-data" }],
  }),
  component: () => <AccountDeletionPage mode="data" />,
});
