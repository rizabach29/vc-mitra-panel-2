import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import PromoCard from "./promo-card";
import { useToast } from "@/components/ui/use-toast";
import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChevronRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { IPromo, IPromoDetail } from "@/types/transaction";
import { isBefore, parseISO } from "date-fns";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import PromoDetail from "./promo-detail";

function Promo({ categoryUuid }: { categoryUuid: string }) {
  const [selectedPromo, setSelectedPromo] = useState<IPromo>();
  const [selectedDetailPromo, setSelectedDetailPromo] = useState<IPromo>();
  const [promos, setPromos] = useState<IPromo[]>([]);
  const [hiddenPromo, setHiddenPromo] = useState<IPromoDetail>();
  const [hiddenPromoCode, setHiddenPromoCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const { toast } = useToast();
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;

  const onPromoSelected = (e?: IPromo) => {
    dispatch({
      action: "SET_PROMO",
      payload: e,
    });
  };

  const onDetailClicked = (p?: IPromo) => {
    setSelectedDetailPromo(p);
    setOpen(false);
    setDetailOpen(true);
  };

  const getData = async (id?: string) => {
    if (!id || !categoryUuid) return;
    setLoading(true);

    let qParams = new URLSearchParams();
    qParams.append("product_key", id);
    qParams.append("category_key", categoryUuid);

    var res = await fetch(`/api/products/promo?` + qParams);

    if (res.ok) {
      var result = await res.json();

      if (result.data) {
        var list = result.data.filter((i: any) =>
          isBefore(new Date(), parseISO(i.time_finish))
        );
        setPromos(list);
        setLoading(false);
        return;
      }

      setPromos([]);
    }
    setLoading(false);
  };

  const getHiddenPromo = async () => {
    setLoading(true);
    let qParams = new URLSearchParams();
    qParams.append("category_key", categoryUuid);
    qParams.append("by-code", "1");
    var res = await fetch(`/api/products/promo/${hiddenPromoCode}?${qParams}`);
    if (res.ok) {
      var result = await res.json();

      var set = new Set(promos.map((i) => i.id));
      var isExist = set.has(result.data.id);

      if (
        result.data &&
        !isExist &&
        !isBefore(parseISO(result.data.time_finish), new Date())
      ) {
        setHiddenPromo(result.data);
        setSelectedPromo(result.data.id);
        setLoading(false);
        return;
      }
    }

    toast({
      title: "Failed",
      description: "Promo Tidak Ditemukan",
      variant: "destructive",
    });
    setHiddenPromo(undefined);
    setLoading(false);
  };

  useEffect(() => {
    getData(data.product?.key);
    setSelectedPromo(undefined);
    onPromoSelected();
  }, [data.product, categoryUuid]);

  const selectPromo = (promo?: IPromo) => {
    setSelectedPromo(promo);
    onPromoSelected(promo);
    setOpen(false);
  };

  return (
    <>
      {selectedPromo ? (
        <PromoCard
          selected={selectedPromo}
          promo={selectedPromo}
          setSelected={() => setOpen(true)}
          onClose={() => selectPromo(undefined)}
        />
      ) : (
        <div
          onClick={() => setOpen(true)}
          className="rounded-full cursor-pointer hover:bg-zinc-50 py-1.5 px-4 border-2 flex justify-between items-center"
        >
          <p className="p-0 m-0 text-sm">Pilih Promo</p>
          <ChevronRightIcon />
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          autoFocus={false}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Promo</DialogTitle>
            <DialogDescription>Pilih promo paling cuan.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="mt-2 flex space-x-2 items-center">
              <Input
                placeholder="Punya Kode Promo? Masukan di sini"
                value={hiddenPromoCode}
                autoFocus={false}
                onChange={(e) => setHiddenPromoCode(e.target.value)}
              />
              <Button
                disabled={loading}
                className="space-x-1"
                size="sm"
                onClick={getHiddenPromo}
              >
                <MagnifyingGlassIcon />
                <p className="hidden md:block">
                  {loading ? "Loading..." : "Get Promo"}
                </p>
              </Button>
            </div>
            <div className="space-y-3 max-h-[56vh] overflow-y-auto">
              {hiddenPromo ? (
                <PromoCard
                  promo={hiddenPromo}
                  selected={selectedPromo}
                  setSelected={(e) => selectPromo(e)}
                  isSecret
                  onDetailClicked={onDetailClicked}
                />
              ) : null}
              {promos.map((i) => (
                <PromoCard
                  key={i.promo_code}
                  promo={i}
                  selected={selectedPromo}
                  setSelected={(e) => selectPromo(e)}
                  onDetailClicked={onDetailClicked}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <PromoDetail
        p={selectedDetailPromo}
        onSelected={() => selectPromo(selectedDetailPromo)}
        onBack={() => {
          setDetailOpen(false);
          setOpen(true);
        }}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
}

export default Promo;
