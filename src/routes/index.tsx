import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Homse — Home services, done right" },
      {
        name: "description",
        content:
          "Book verified professionals for cleaning, salon, repairs and appliance services with clear prices and pay-after-service convenience.",
      },
      { property: "og:title", content: "Homse — Home services, done right" },
      {
        property: "og:description",
        content:
          "Verified home-service professionals, upfront prices, and payment only after the job is done.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="homse-page">
      <iframe
        className="homse-frame"
        src="/homse/index.html"
        title="Homse home services"
      />
    </main>
  );
}
