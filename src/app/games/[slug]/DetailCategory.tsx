"use client";
import React from "react";
import Header from "./header";
import { IUseCategoryData } from "./useCategory";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FormWrapper from "./form-wrapper";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import InternalLink from "./internal-link";

interface Props extends IUseCategoryData {
  appName: string;
  session: Session | null;
}

const ProductList = dynamic(() => import("./(product)/product-list"), {
  ssr: false,
});
const Payment = dynamic(() => import("./(payment-method)/payment"), {
  ssr: false,
});
const Promo = dynamic(() => import("./(promo)/promo-list"), {
  ssr: false,
});
const FormConfirmation = dynamic(
  () => import("./(account-confirmation)/form-confirmation"),
  {
    ssr: false,
  }
);
const CheckoutAction = dynamic(() => import("./(checkout)/checkout-action"), {
  ssr: false,
});
const FormAccount = dynamic(() => import("./(form-id)/form-account"), {
  ssr: false,
});

function DetailCategory(props: Props) {
  if (props.data.category !== null && props.data.category !== undefined)
    return (
      <>
        <div className="md:mt-4">
          <Breadcrumb className="hidden md:block mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/games">Daftar Produk</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{props.data.category.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-lg font-bold ml-2 text-primary p-0 hidden md:block">
            {props.data.category.name}
          </h1>
        </div>
        <div className="lg:grid lg:grid-cols-5 lg:gap-4 w-full">
          <div className="col-span-2 my-0.5">
            <div className="md:sticky md:top-16">
              <Header name={props.appName} category={props.data.category} />
              <div className="hidden md:block mt-4">
                <InternalLink />
              </div>
            </div>
          </div>
          <div className="col-span-3 ">
            <div ref={props.productListRef} className="mt-4 md:mt-0">
              <FormWrapper number={1} title="Produk">
                <ProductList
                  nextRef={props.methodRef}
                  products={props.products}
                />
              </FormWrapper>
            </div>
            <div className="my-4" ref={props.methodRef}>
              <FormWrapper number={2} title="Pilih Pembayaran">
                <Payment
                  nextRef={
                    props.data.category.forms
                      ? props.formRef
                      : props.confirmationRef
                  }
                />
              </FormWrapper>
            </div>
            {props.data.category.forms ? (
              <div ref={props.formRef} className="w-full my-4">
                <FormWrapper number={3} title="Masukkan Data Akun">
                  <FormAccount forms={props.data.category.forms} />
                </FormWrapper>
              </div>
            ) : null}
            <div ref={props.confirmationRef}>
              <FormWrapper
                number={props.data.category.forms ? 4 : 3}
                title="Info Kontak"
              >
                <FormConfirmation />
              </FormWrapper>
            </div>
            <div className="w-full my-4" ref={props.couponRef}>
              <FormWrapper
                number={props.data.category.forms ? 5 : 4}
                title="Pilih Promo"
              >
                <Promo categoryUuid={props.data.category?.key} />
              </FormWrapper>
            </div>
            <CheckoutAction
              confirmationRef={props.confirmationRef}
              formRef={props.formRef}
              paymentRef={props.methodRef}
            />
          </div>
        </div>
      </>
    );
}

export default DetailCategory;
