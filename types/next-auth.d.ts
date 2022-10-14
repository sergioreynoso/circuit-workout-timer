import type { DefaultUser } from "next-auth";

export interface User {
  name: string;
  email: string;
  id: string;
  image: string;
}

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}
