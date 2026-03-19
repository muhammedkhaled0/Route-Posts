import NextAuth from "next-auth"
import { UserInLoginI } from "../interfaces/UserI"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user:UserInLoginI
  }
  interface User {
    user:UserInLoginI,
    token: string
  }

}
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user:UserInLoginI,
    token: string
  }
}

