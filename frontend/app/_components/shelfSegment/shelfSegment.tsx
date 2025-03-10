'use client';

import {LibraryContext} from "@/app/_providers/libraryProvider";
import {useContext, useEffect, useState} from "react";
import BookCard from "../bookCard/bookCard";

// First page should be already provided to prevent loading at start
type ShelfSegmentProps = {
  id: string,
  firstPageBooks: BookData[]
};

export default function ShelfSegment({
  id,
  firstPageBooks
}: ShelfSegmentProps) {
  const [shelf, setShelf] = useState<ShelfData | null>(null);
  const [books, setBooks] = useState(firstPageBooks);
  const libraryContext = useContext(LibraryContext);

  useEffect(() => {
    const shelf = libraryContext.value.find(shelf => shelf.id === Number(id)); 

    if(shelf) {
      setShelf(shelf);
    }
  }, [id]);

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <div>
      {shelf ?
        <div className="flex flex-col py-8 items-center gap-8">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center">{shelf.name}</h1>
            <p className="text-lg font-semibold italic">Books count: {shelf.booksCount}</p>
          </div>

          <div className="w-full md:w-auto grid grid-cols-1 md:grid-cols-4 gap-8 justify-center">
            {books.map((book, i) => (
              <BookCard key={i} book={book} shelf={shelf} />
            ))}
          </div>
        </div>
        :
        <div className="pt-8">
          <h1 className="text-2xl font-bold text-center">Shelf not found.</h1>
        </div>
      }
    </div>
  );
}
