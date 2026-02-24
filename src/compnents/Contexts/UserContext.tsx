"use client";

import { UserI } from "@/src/interfaces/UserI";
import { getMyProfileApi } from "@/src/services/UserServices";
import React, { createContext, useEffect, useState } from "react";

type UserContextType = {
  user: UserI | null;
};

export const UserContext = createContext<UserContextType>({
  user: null,
});

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserI | null>(null);
  useEffect(() => {
    async function fetchUser() {
      const data = await getMyProfileApi();
      setUser(data);
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}