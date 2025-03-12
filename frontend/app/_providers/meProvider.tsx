'use client';

import React, { createContext } from "react";

type MeProviderProps = {
  children: React.ReactNode,
  me: UserData 
};

export const MeContext = createContext<UserData | null>(null);

export default function MeProvider({
  children,
  me
}: MeProviderProps) {
  return (
    <MeContext.Provider value={me}>
      {children}
    </MeContext.Provider>
  );
}