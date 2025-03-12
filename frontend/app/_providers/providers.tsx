'use client';

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import {createContext} from "react";

export const MeContext = createContext<UserData | undefined>(undefined);

export function Providers({ me, children }: { me: UserData | undefined, children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <MeContext.Provider value={me}>
        <ToastProvider
          regionProps={{
            className: 'z-[60]'
          }}   
        />
        {children}
      </MeContext.Provider>
    </HeroUIProvider>
  );
}
