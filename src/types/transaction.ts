import { IProductCategory, LooseObject, TProduct, TProductItem } from "@/Type";

export interface ICategoryForm {
  key: string;
  value: string;
}

export interface ITransactionCreate {
  category_key: string;
  product_key: string;
  payment_method: string;
  payment_channel: string;
  email: string;
  phone: string;
  form_data?: ICategoryForm[];
  promo_code?: string;
}

export interface ITransactionHistory {
  status: number;
  status_name: string;
  timestamp: string;
}

export interface IBasePaymentInformation {
  invoice_code: string;
  payment_channel: string;
  payment_amount: number;
  expired_at: string;
  guide: string;
  image_url: string;
}

export interface IVAPayment extends IBasePaymentInformation {
  payment_method: "VIRTUAL_ACCOUNT";
  virtual_account_number: string;
  virtual_account_name: string;
}
export interface ILinkPayment extends IBasePaymentInformation {
  payment_method: "EWALLET";
  deeplink_url: string;
  mobile_url: string;
  web_url: string;
}
export interface IQRPayment extends IBasePaymentInformation {
  payment_method: "QR_CODE";
  qr_code: string;
}

export interface ITransactionHistoryDetail {
  date: string;
  transaction_code: string;
  category_key: string;
  category_name: string;
  product_key: string;
  product_name: string;
  email: string;
  phone: string;
  order_description: string;
  customer_data: string;
  price: number;
  paid_price: number;
  discount: number;
  admin_fee: number;
  grand_total: number;
  status_name: string;
  status: number;
  history_status: ITransactionHistory[];
  payment_information: IVAPayment | ILinkPayment | IQRPayment;
}

// =========== TRANSACTION CONTEXT ================
interface BasePayment {
  payment_channel: string;
  name: string;
  image_url: string;
  fee_percent: number;
  fee_amount: number;
}

interface GeneralPayment extends BasePayment {
  payment_method: "VIRTUAL_ACCOUNT" | "EWALLET" | "QR_CODE";
}

interface SaldoPayment extends BasePayment {
  payment_method: "SALDO";
  saldo: number;
}

export type IPayment = SaldoPayment | GeneralPayment;

export interface IPaymentGroup {
  name: string;
  payment_method: IPayment[];
}

export interface IPromo {
  id: string;
  promo_code: string;
  name: string;
  short_description: string;
  time_start: string;
  time_finish: string;
  minimal_amount: number;
  stock: number;
  is_discount_percent: boolean;
  discount_percent: number;
  discount_amount: number;
  maximum_discount_amount: number;
}

export interface IPromoDetail extends IPromo {
  description: string;
  image_url: string;
  status: number;
  products: string[];
}

export interface IAccount {
  noWhatsapp: string;
  email: string;
}

export interface ITransaction {
  product?: TProductItem;
  products: TProductItem[];
  category?: IProductCategory | null;
  promo?: IPromo;
  payment?: IPayment;
  form?: LooseObject;
  account?: IAccount;
}

// ===============================================
