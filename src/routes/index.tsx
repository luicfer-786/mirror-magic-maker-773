import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let observer: ResizeObserver | undefined;
    const measure = () => {
      const content = frame.contentDocument?.querySelector("x-dc > div");
      if (!content) return;
      observer?.disconnect();
      const updateHeight = () => setFrameHeight(content.scrollHeight);
      updateHeight();
      observer = new ResizeObserver(updateHeight);
      observer.observe(content);
    };
    frame.addEventListener("load", measure);
    measure();
    return () => {
      frame.removeEventListener("load", measure);
      observer?.disconnect();
    };
  }, []);

  return (
    <main className="homse-page">
      <iframe
        ref={frameRef}
        className="homse-frame"
        src="/homse/index.html"
        title="Homse home services"
        style={{ height: frameHeight }}
      />
    </main>
  );
}
