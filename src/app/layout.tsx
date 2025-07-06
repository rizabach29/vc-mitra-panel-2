import { Suspense } from "react";
import RootTemplateLayout from "./root-layout";
import Loading from "./loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: ` 
            #qontak-webchat-widget {
              bottom: 24px !important;
            }`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=%27+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MCKSD3KS');
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-repeat antialiased bg-zinc-50">
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MCKSD3KS"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>`,
          }}
        />
        <Suspense fallback={<Loading />}>
          <RootTemplateLayout>{children}</RootTemplateLayout>
        </Suspense>
      </body>
    </html>
  );
}
