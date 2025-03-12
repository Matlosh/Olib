import { LibraryContextType } from "@/app/_providers/libraryProvider";

// Updates all already existing bokos
export const updateBooksLibraryContext = (libraryContext: LibraryContextType, nextBook: BookData) => {
  const shelves = [...libraryContext.value];

  for(const shelf of shelves) {
    const bookIndex = shelf.books.findIndex(b => b.id === nextBook.id);

    if(bookIndex > -1) {
      shelf.books[bookIndex] = nextBook;
    }
  }

  libraryContext.setValue(shelves);
};

export const updateCoverLibraryContext = (libraryContext: LibraryContextType, book: BookData, coverUrl: string) => {
  const shelves = [...libraryContext.value];

  for(const shelf of shelves) {
    for(const shelfBook of shelf.books) {
      if(shelfBook.id === book.id) {
        shelfBook.imageUrl = coverUrl;
      }
    }
  }

  libraryContext.setValue(shelves);
}

// Adds/removes book from shelves (doesn't do anything with existing and okay ones)
export const updateShelvesLibraryContext = (
  libraryContext: LibraryContextType, prevBook: BookData | undefined, nextBook: BookData, edit: boolean) => {

  const shelves = [...libraryContext.value];

  if(edit) {
    if(prevBook) {
      const oldShelvesIds = prevBook.shelvesIds;
      const newShelvesIds = nextBook.shelvesIds;

      const shelvesToRemove = oldShelvesIds.filter(id => !newShelvesIds.includes(id));
      const shelvesToAdd = newShelvesIds.filter(id => !oldShelvesIds.includes(id));

      if(shelvesToRemove.length > 0) {
        for(const shelf of shelves) {
          if(shelvesToRemove.includes(shelf.id)) {
            shelf.books = shelf.books.filter(book => book.id !== nextBook.id);
          }
        }
      }

      if(shelvesToAdd.length > 0) {
        for(const shelf of shelves) {
          if(shelvesToAdd.includes(shelf.id)) {
            shelf.books.push(nextBook);
          }
        }
      }
    }
  } else {
    for(const shelf of shelves) {
      if(nextBook.shelvesIds.includes(shelf.id)) {
        shelf.books.push(nextBook);
      }
    }
  }

  libraryContext.setValue(shelves);
};

export const updateShelfLibraryContext = (libraryContext: LibraryContextType, nextShelf: ShelfData) => {
    const shelves = [...libraryContext.value];
    const shelfIndex = shelves.findIndex(shelf => shelf.id === nextShelf.id);

    if(shelfIndex > 0) {
      shelves[shelfIndex] = nextShelf;
    }

    libraryContext.setValue(shelves);
  };

export const updateShelfBookRemoveLibraryContext = (libraryContext: LibraryContextType, shelf: ShelfData, book: BookData) => {
  const shelves = [...libraryContext.value];

  const matchingShelf = shelves.find(s => s.id === shelf.id);
  if(matchingShelf) {
    matchingShelf.books = matchingShelf.books.filter(b => b.id !== book.id);
  }

  libraryContext.setValue(shelves);
};

export const updateBookDeleteLibraryContext = (libraryContext: LibraryContextType, book: BookData) => {
  const shelves = [...libraryContext.value];

  shelves.map(shelf => {
    const bookIndex = shelf.books.findIndex(b => b.id === book.id);
    shelf.books.splice(bookIndex, 1);
    return shelf;
  });
  
  libraryContext.setValue(shelves);
};