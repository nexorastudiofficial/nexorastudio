"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { FB_PIXEL_ID, pageview } from "@/lib/pixel";

function PixelRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track PageView on route / search parameter changes
    pageview();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Global listener for buttons and links with data-pixel-event or data-pixel-button
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-pixel-event], [data-pixel-button]");
      if (!target) return;

      const eventName = target.getAttribute("data-pixel-event");
      const buttonName = target.getAttribute("data-pixel-button") || target.textContent?.trim() || "Button";

      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        if (eventName) {
          window.fbq("track", eventName, {
            button_name: buttonName,
            path: window.location.pathname,
          });
        } else {
          window.fbq("trackCustom", "ButtonClick", {
            button_name: buttonName,
            path: window.location.pathname,
          });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}

export default function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel-init" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <PixelRouteTracker />
      </Suspense>
    </>
  );
}
