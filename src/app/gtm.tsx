"use client";

import { GoogleTagManager, sendGTMEvent } from "@next/third-parties/google";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function GTM() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Send a GTM event when the pathname or searchParams change
    sendGTMEvent({
      event: "pageview",
      page: {
        path: pathname,
        query: Object.fromEntries(searchParams.entries()),
      },
    });
  }, [pathname, searchParams]);

  return <GoogleTagManager gtmId="GTM-P25S2QGV" />;
}

export default GTM;
