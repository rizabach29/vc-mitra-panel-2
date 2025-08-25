import { Suspense } from "react";
import RootTemplateLayout from "./root-layout";
import Loading from "./loading";
import GTM from "./gtm";

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
      </head>
      <body className="min-h-screen bg-repeat antialiased bg-zinc-50">
        <Suspense fallback={<Loading />}>
          <RootTemplateLayout>{children}</RootTemplateLayout>
        </Suspense>
        <GTM />
      </body>
    </html>
  );
}
