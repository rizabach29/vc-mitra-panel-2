"use client";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { TProductItem } from "@/Type";
import { useSearchParams } from "next/navigation";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { useSession } from "next-auth/react";
import { ITransaction } from "@/types/transaction";

export interface IUseCategoryData {
  data: ITransaction;
  products: TProductItem[];
  loading: boolean;
  formRef: RefObject<HTMLDivElement>;
  productListRef: RefObject<HTMLDivElement>;
  methodRef: RefObject<HTMLDivElement>;
  couponRef: RefObject<HTMLDivElement>;
  confirmationRef: RefObject<HTMLDivElement>;
}

function useCategory(id: string): IUseCategoryData {
  const { data: session } = useSession();
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const [products, setProducts] = useState<TProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const formRef = useRef<HTMLDivElement>(null);
  const productListRef = useRef<HTMLDivElement>(null);
  const methodRef = useRef<HTMLDivElement>(null);
  const couponRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    setLoading(true);
    var res = await fetch(`/api/products/categories/${id}?`);

    if (res.ok) {
      var result = await res.json();
      if (result.data) {
        dispatch({
          action: "SET_CATEGORY",
          payload: result.data,
        });
        setLoading(false);
        // setProducts(uniqeProduct(result.data.products));

        res = await fetch(`/api/products/items/${id}?`);
        if (res.ok) {
          result = await res.json();
          setProducts(result.data);
          dispatch({
            action: "SET_PRODUCTS",
            payload: result.data,
          });

          var selectedItem = searchParams.get("item");
          if (result.data && selectedItem) {
            dispatch({
              action: "SET_PRODUCT",
              payload: result.data.find(
                (i: TProductItem) => i.key == selectedItem
              ),
            });
          }
        }
      }
    } else
      dispatch({
        action: "SET_CATEGORY",
        payload: null,
      });

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (session)
      dispatch({
        action: "SET_ACCOUNT",
        payload: {
          email: session.profile.email,
          noWhatsapp: session.profile.phone,
        },
      });
  }, [session]);

  return {
    data,
    products,
    loading,
    formRef,
    productListRef,
    methodRef,
    couponRef,
    confirmationRef,
  };
}

export default useCategory;
