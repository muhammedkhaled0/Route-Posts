"use client";

import { UserI } from "@/src/interfaces/UserI";
import { getMyProfileApi } from "@/src/services/UserServices.action";
import React, { createContext, useEffect, useState } from "react";

type UserContextType = {
  user: UserI | null;
  error: string | null;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  error: null,
});

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserI | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getMyProfileApi();
        setUser(data);
      } catch (err) {
        setError((err as Error).message);
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, error }}>
      {children}
    </UserContext.Provider>
  );
}