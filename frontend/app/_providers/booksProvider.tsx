'use client';

import React, { createContext } from "react";

type BooksProviderProps = {
  children: React.ReactNode,
  books: BookData[],
  setBooks: (books: BookData[]) => void
};

export type BooksContextType = {
  value: BookData[],
  setValue: (books: BookData[]) => void
};

export const BooksContext = createContext<BooksContextType>({
  value: [],
  setValue: (value: BookData[]) => {}
});

export default function BooksProvider({
  children,
  books,
  setBooks
}: BooksProviderProps) {
  return (
    <BooksContext.Provider value={{
      value: books,
      setValue: setBooks
    }}>
      {children}
    </BooksContext.Provider>
  );
}