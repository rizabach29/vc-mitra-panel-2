import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    token: string;
    profile: {
      name: string;
      email: string;
      phone: string;
      saldo: number;
      tier_name: string;
      registered_at: string;
      qty_successe: number;
      amount_successe: number;
    };
  }

  interface User {
    token: string;
    profile: {
      name: string;
      email: string;
      phone: string;
      saldo: number;
      tier_name: string;
      registered_at: string;
      qty_successe: number;
      amount_successe: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    profile: {
      name: string;
      email: string;
      phone: string;
      saldo: number;
      tier_name: string;
      registered_at: string;
      qty_successe: number;
      amount_successe: number;
    };
    token: string;
  }
}
