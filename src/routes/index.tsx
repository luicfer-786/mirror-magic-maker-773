import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

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
  const [frameHeight, setFrameHeight] = useState(5640);
  const observerRef = useRef<ResizeObserver | null>(null);

  return (
    <main className="homse-page">
      <iframe
        className="homse-frame"
        src="/homse/index.html"
        title="Homse home services"
        style={{ height: frameHeight }}
        onLoad={(event) => {
          const frame = event.currentTarget;
          const body = frame.contentDocument?.body;
          if (!body) return;
          observerRef.current?.disconnect();
          const updateHeight = () => setFrameHeight(body.scrollHeight);
          updateHeight();
          observerRef.current = new ResizeObserver(updateHeight);
          observerRef.current.observe(body);
        }}
      />
    </main>
  );
}
