import {
  IFlashSaleInProduct,
  IProductCategory,
  TProduct,
  TProductItem,
} from "./Type";
import { IPayment, IPromo } from "./types/transaction";

const thousandMask = (val: number | undefined) => {
  if (!val) return "0";
  val = Math.round(val);
  return val.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
};

const priceMask = (val: number | undefined) => {
  if (!val) return "Rp 0";
  return "Rp " + thousandMask(val);
};

const uniqeProduct = (arr: TProduct[], track = new Set()) => {
  if (!arr) return [];

  return arr.filter(({ uuid }) => (track.has(uuid) ? false : track.add(uuid)));
};

const uniqeCategory = (arr: IProductCategory[], track = new Set()) => {
  if (!arr) return [];

  return arr.filter(({ uuid }) => (track.has(uuid) ? false : track.add(uuid)));
};

function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

const getTotalPrice = (
  product: TProductItem,
  promo?: IPromo,
  payment?: IPayment
) => {
  let total = 0;

  if (product) {
    total = product.discounted_price || product.price;

    if (promo) {
      if (!promo.is_discount_percent) total -= promo.discount_amount;
      else total -= (promo.discount_percent * product.price) / 100;
    }

    let fee = 0;
    if (payment)
      fee = payment.fee_percent
        ? (total * payment.fee_percent) / 100
        : payment.fee_amount;

    total += fee;
  }

  return total;
};

const getFeePrice = (product?: TProductItem, payment?: IPayment) => {
  if (payment) {
    if (payment?.fee_percent) {
      if (product) {
        let total = product.discounted_price || product.price;

        return (total * payment.fee_percent) / 100;
      }
      return 0;
    }
    return payment.fee_amount;
  }

  return 0;
};

function nFormatter(num: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "rb" },
    { value: 1e6, symbol: "jt" },
    { value: 1e9, symbol: "M" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(2).replace(regexp, "").concat(item.symbol)
    : "0";
}

function nPlainFormatter(val: number) {
  return val.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
}

function HexToHSL(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    return "240, 5.9%, 10%";
  }

  const rHex = parseInt(result[1], 16);
  const gHex = parseInt(result[2], 16);
  const bHex = parseInt(result[3], 16);

  const r = rHex / 255;
  const g = gHex / 255;
  const b = bHex / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = (max + min) / 2;
  let s = h;
  let l = h;

  if (max === min) {
    // Achromatic
    return `0, 0%, ${l}`;
  }

  const d = max - min;
  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    case b:
      h = (r - g) / d + 4;
      break;
  }
  h /= 6;

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return `${h}, ${s}%, ${l}%`;
}

export {
  thousandMask,
  HexToHSL,
  priceMask,
  uniqeProduct,
  uniqeCategory,
  debounce,
  nFormatter,
  nPlainFormatter,
  getTotalPrice,
  getFeePrice,
};
