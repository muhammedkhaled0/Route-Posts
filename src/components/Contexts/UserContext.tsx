"use client";

import { UserI } from "@/src/interfaces/UserI";
import { getMyProfileApi } from "@/src/services/UserServices.action";
import React, { createContext, useEffect, useState } from "react";

type UserContextType = {
  user: UserI | null;
  error: string | null;
  loading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  error: null,
  loading: true,
});

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserI | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getMyProfileApi();
        setUser(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, error, loading }}>
      {children}
    </UserContext.Provider>
  );
}