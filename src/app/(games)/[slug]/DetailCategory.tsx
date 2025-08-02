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
import dynamic from "next/dynamic";
import InternalLink from "./internal-link";
import ProductWrapper from "./(product)/product-wrapper";

interface Props extends IUseCategoryData {
  appName: string;
}

const Payment = dynamic(() => import("./(payment-method)/payment"), {
  ssr: true,
});
const Promo = dynamic(() => import("./(promo)/promo-list"), {
  ssr: true,
});
const FormConfirmation = dynamic(
  () => import("./(account-confirmation)/form-confirmation"),
  {
    ssr: true,
  }
);
const CheckoutAction = dynamic(() => import("./(checkout)/checkout-action"), {
  ssr: true,
});
const FormAccount = dynamic(() => import("./(form-id)/form-account"), {
  ssr: true,
});

function DetailCategory(props: Props) {
  if (props.data.category !== null && props.data.category !== undefined)
    return (
      <>
        <div className="md:mt-4">
          <Breadcrumb className="hidden md:block mb-4">
            <BreadcrumbList>
              <BreadcrumbItem position={1}>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {/* <BreadcrumbItem>
                <BreadcrumbLink href="/games">Daftar Produk</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator /> */}
              <BreadcrumbItem position={2}>
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
              <div className="hidden lg:block mt-4">
                <InternalLink />
              </div>
            </div>
          </div>
          <div className="col-span-3 ">
            <div id="product-list" className="mt-4 md:mt-0">
              <FormWrapper number={1} title="Produk">
                <ProductWrapper
                  nextRef={"payment-method"}
                  products={props.products}
                  isPostpaid={props.data.category.is_postpaid}
                />
              </FormWrapper>
            </div>
            <div id="payment-method" className="my-4">
              <FormWrapper number={2} title="Pilih Pembayaran">
                <Payment
                  category={props.data.category}
                  nextRef={
                    props.data.category.forms
                      ? "form-account"
                      : "form-confirmation"
                  }
                />
              </FormWrapper>
            </div>
            {props.data.category.forms ? (
              <div id="form-account" className="w-full my-4">
                <FormWrapper number={3} title="Masukkan Data Akun">
                  <FormAccount
                    isCheckRequired={props.data.category.is_check_id}
                    forms={props.data.category.forms}
                    isPostpaid={props.data.category.is_postpaid}
                  />
                </FormWrapper>
              </div>
            ) : null}
            <div id="form-confirmation">
              <FormWrapper
                number={props.data.category.forms ? 4 : 3}
                title="Info Kontak"
              >
                <FormConfirmation />
              </FormWrapper>
            </div>
            <div id="form-coupon" className="w-full my-4">
              <FormWrapper
                number={props.data.category.forms ? 5 : 4}
                title="Pilih Promo"
              >
                <Promo categoryUuid={props.data.category?.key} />
              </FormWrapper>
            </div>
            <CheckoutAction
              confirmationRef={"form-confirmation"}
              formRef={"form-account"}
              paymentRef={"payment-method"}
            />
          </div>
        </div>
      </>
    );
}

export default DetailCategory;
