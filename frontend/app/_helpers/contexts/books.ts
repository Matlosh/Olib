import { BooksContextType } from "@/app/_providers/booksProvider";

export const updateBooksContext = (booksContext: BooksContextType, book: BookData) => {
  const allBooks = [...booksContext.value];
  const bookIndex = allBooks.findIndex(b => b.id === book.id);
  
  if(bookIndex > -1) {
    allBooks[bookIndex] = book;
  }

  booksContext.setValue(allBooks);
};