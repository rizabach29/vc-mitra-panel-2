import { ISosmed } from "@/types/utils";
import Script from "next/script";
import React from "react";
import { GetCredHeader } from "./api/api-utils";

async function getSocialMedia() {
  var credentialHeader = GetCredHeader();
  var header = {
    "Content-Type": "application/json",
    "X-Sign": credentialHeader.sign,
    "X-User-Id": credentialHeader.mitraid,
    "X-Timestamp": credentialHeader.timestamp.toString(),
  };
  var res = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/site-social-media`,
    {
      headers: header,
      next: {
        revalidate: 7200,
      },
    }
  );

  if (res.ok) {
    var result = await res.json();
    return result.data as ISosmed[];
  }

  return [];
}

async function Ldjson({ appName, url }: { appName: string; url: string }) {
  const data = await getSocialMedia();

  return (
    <>
      <Script
        id="ldjson-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: appName,
            url: url,
            logo: url + "/assets/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: data.find((x) => x.key === "email")?.value || "",
              telephone: data.find((x) => x.key === "telephone")?.value || "",
              areaServed: "ID",
              availableLanguage: ["Indonesian"],
            },
            sameAs: data
              .filter(
                (item) =>
                  item.key !== "email" && item.key !== "telephone" && item.value
              )
              .map((item) => item.value),
          }),
        }}
      />
    </>
  );
}

export default Ldjson;
