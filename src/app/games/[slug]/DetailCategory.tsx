"use client";
import React, { useContext } from "react";
import Header from "./header";
import ProductList from "./(product)/product-list";
import Payment from "./(payment-method)/payment";
import Promo from "./(promo)/promo-list";
import FormConfirmation from "./(account-confirmation)/form-confirmation";
import CheckoutAction from "./(checkout)/checkout-action";
import { IUseCategoryData } from "./useCategory";
import FormAccount from "./(form-id)/form-account";
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
import ThemeContext, {
  IThemeContext,
} from "@/infrastructures/context/theme/theme.context";

interface Props extends IUseCategoryData {
  session: Session | null;
}

function DetailCategory(props: Props) {
  const { data: theme } = useContext(ThemeContext) as IThemeContext;
  if (props.data.category !== null && props.data.category !== undefined)
    return (
      <>
        <div className="lg:grid lg:grid-cols-5 lg:space-x-4 w-full px-3">
          <div className="col-span-full mt-4">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/games">Game</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{props.data.category.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h4 className="text-lg font-bold ml-4 text-primary p-0">
              {props.data.category.name}
            </h4>
          </div>
          <div className="col-span-2 my-0.5">
            <div className="md:sticky md:top-16">
              <Header category={props.data.category} />
            </div>
          </div>
          <div className="col-span-3 ">
            <div ref={props.productListRef} className="mt-4 md:mt-0">
              <FormWrapper number={1} title="Produk">
                <ProductList
                  // category={data.category.name}
                  nextRef={props.methodRef}
                  products={props.products}
                  // productSelected={data.product}
                />
              </FormWrapper>
            </div>
            <div className="my-4" ref={props.methodRef}>
              <FormWrapper number={2} title="Pilih Pembayaran">
                <Payment />
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
