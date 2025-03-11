'use client';

import { getBooksByName } from "@/app/_actions/books/actions";
import { useEffect, useState } from "react";

type SearchBooksProps = {
  name: string
};

export default function SearchBooks({
  name
}: SearchBooksProps) {
  const [books, setBooks] = useState<BookData[]>([]);

  useEffect(() => {
    if(name.trim().length > 2) {
      (async () => {
        try {
          const data = await getBooksByName(name);

          if(!('message' in data)) {
            setBooks(data);
          }
        } catch(err) {}
      })();
    }
  }, [name]);

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <div>

    </div>
  );
}