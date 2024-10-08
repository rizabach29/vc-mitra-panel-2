import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "./profile";
import Password from "./password";
import BackHeader from "@/components/header/back-header";
import Head from "next/head";
import { headers } from "next/headers";

function Page() {
  var url = headers().get("host") ?? "";

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: { "@id": url, name: "Home" },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@id": url + "/profile",
                    name: "Profile",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@id": url + "/profile/edit",
                    name: "Edit Profile",
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <BackHeader title="Edit Profil" />
      <div className="flex justify-center w-full px-2">
        <div className="max-w-7xl w-full md:mt-4 mb-4 flex flex-col justify-center items-center">
          <Breadcrumb className="mb-4 hidden md:inline-flex justify-start w-full">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="max-w-4xl w-full space-y-4">
            <Tabs defaultValue="profile" className="w-full">
              <div className="bg-background rounded-lg pt-4 px-6 pb-8 w-full sticky top-12">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="reset">Keamanan</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                  <h3 className="font-semibold text-primary p-0 hidden md:block">
                    Edit Profile
                  </h3>
                  <h6 className="text-primary p-0">Informasi Akun</h6>
                  <Profile />
                </TabsContent>
                <TabsContent value="reset">
                  <h3 className="font-semibold text-primary p-0 hidden md:block">
                    Edit Profile
                  </h3>
                  <h6 className="text-primary p-0">Ubah Keamanan Akun</h6>
                  <Password />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
