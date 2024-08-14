"use client";
import React from "react";
import SaldoPointHistory from "./saldopoint-history";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSession } from "next-auth/react";

function Page() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center w-full px-2">
      <div className="max-w-6xl w-full my-4 flex flex-col justify-center items-center">
        <Breadcrumb className="mb-4 inline-flex justify-start w-full">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Saldo History</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="max-w-4xl w-full space-y-4">
          <div className="bg-background rounded-lg p-4 w-full sticky top-12">
            <h3 className="font-semibold primary">Saldo History</h3>
            <h6 className="text-primary font-medium">
              {new Intl.NumberFormat().format(session?.profile.saldo ?? 0)}{" "}
              Points
            </h6>
          </div>
          <SaldoPointHistory />
        </div>
      </div>
    </div>
  );
}

export default Page;