'use client';

import { getBooksByName } from "@/app/_actions/books/actions";
import { excerptString, getImageFullUrl } from "@/app/_utils/reusable";
import { Card, CardBody, Divider, Image, Modal, ModalBody, ModalContent } from "@heroui/react";
import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import BookInfoCard from "../bookCard/bookInfoCard";
import { LibraryContext } from "@/app/_providers/libraryProvider";

type SearchBooksProps = {
  name: string,
  canShowResults: boolean
};

type SearchBookProps = {
  book: BookData,
  setSelectedBook: (book: BookData) => void
};

export default function SearchBooks({
  name,
  canShowResults
}: SearchBooksProps) {
  const [isBookModalOpened, setIsBookModalOpened] = useState(false);
  const [books, setBooks] = useState<BookData[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [defaultShelf, setDefaultShelf] = useState<ShelfData | null>(null);
  const libraryContext = useContext(LibraryContext);

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
    } else {
      setBooks([]);
    }
  }, [name]);

  useEffect(() => {
    const shelf = libraryContext.value.find(s => s.default);

    if(shelf) {
      setDefaultShelf(shelf); 
    }
  }, []);

  const removeBookFromSearch = (book: BookData) => {
    const newBooks = [...books];    
    const index = newBooks.findIndex(b => b.id === book.id);

    if(index > -1) {
      newBooks.splice(index, 1);
    }

    setBooks(newBooks);
  };

  function SearchBook({
    book,
    setSelectedBook
  }: SearchBookProps) {
    return (
      <div className="w-full flex flex-row items-center p-2 cursor-pointer hover:bg-amber-500/20"
        onMouseDown={() => setSelectedBook(book)}>
        <div className="w-[50px] h-full rounded-xl shadow-2xl">
          <Image
            isBlurred
            alt={book.name}
            src={book.imageUrl.length > 0 ? getImageFullUrl(book.imageUrl) : '/images/book-placeholder.webp'}
            width={50}
            height={70}
            className="object-cover"
          />
        </div>

        <div className="flex-1 p-2 flex-col gap-2">
          <h3 className="text-lg font-bold">{excerptString(book.name, 20)}</h3>
          <p>{book.author}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {canShowResults &&
        <Card className={clsx("w-full", books.length < 1 && "hidden")}>
          <CardBody className="overflow-hidden">
            {books.map((book, i) => (
              <React.Fragment key={book.id}>
                <SearchBook
                  book={book}
                  setSelectedBook={searchBook => {
                    setSelectedBook(searchBook);
                    setIsBookModalOpened(true);
                  }} />
                {i < books.length - 1 &&
                  <Divider className="my-2" /> 
                }
              </React.Fragment>
            ))}
          </CardBody>
        </Card>
      }
      
      {defaultShelf !== null && selectedBook !== null &&
        <Modal
          isOpen={isBookModalOpened}
          onClose={() => setIsBookModalOpened(false)}
          size="3xl"
          placement="center"
          scrollBehavior="inside">
          <ModalContent>
            {(onClose) => (
              <ModalBody>
                <BookInfoCard
                  book={selectedBook}
                  shelf={defaultShelf}
                  onBookDelete={searchBook => {
                    setIsBookModalOpened(false);
                    setSelectedBook(null);
                    removeBookFromSearch(searchBook);
                  }}
                />
              </ModalBody>
            )}
          </ModalContent>
        </Modal>
      }
    </>
  );
}