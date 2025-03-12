'use client';

import {createContext, useState} from "react";

type LibraryProviderProps = {
  children: React.ReactNode,
  shelves: ShelfData[]
};

export type LibraryContextType = {
  value: ShelfData[],
  setValue: (value: ShelfData[]) => void
};

export const LibraryContext = createContext<LibraryContextType>({
  value: [],
  setValue: (value: ShelfData[]) => {}
});

export function LibraryProvider({
  children,
  shelves
}: LibraryProviderProps) {
  const [value, setValue] = useState<ShelfData[]>(shelves);

  return (
    <LibraryContext.Provider value={{
      value: value,
      setValue: setValue
    }}> 
      {children}
    </LibraryContext.Provider>
  );
}
