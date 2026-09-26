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
  return (
    <main className="homse-page">
      <DesignFrame className="homse-desktop" src="/homse/index.html" initialHeight={5640} title="Homse home services" />
      <DesignFrame className="homse-mobile" src="/homse-mobile/index.html" initialHeight={6000} title="Homse mobile home services" />
    </main>
  );
}

function DesignFrame({ className, src, initialHeight, title }: { className: string; src: string; initialHeight: number; title: string }) {
  const [frameHeight, setFrameHeight] = useState(initialHeight);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let observer: ResizeObserver | undefined;
    const measure = () => {
      const content = frame.contentDocument?.querySelector("x-dc > div, .mobile-canvas");
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
    <iframe
      ref={frameRef}
      className={`homse-frame ${className}`}
      src={src}
      title={title}
      style={{ height: frameHeight }}
      onLoad={() => {
        window.setTimeout(() => {
          const content = frameRef.current?.contentDocument?.querySelector("x-dc > div, .mobile-canvas");
          if (content) setFrameHeight(content.scrollHeight);
        }, 0);
      }}
    />
  );
}
