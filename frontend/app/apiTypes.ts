/* Types mapping the responses from the Spring API */

type UserData = {
  nick: string
};

type BookData = {
  id: number,
  shelvesIds: number[],
  name: string,
  author: string,
  isbn: string,
  imageUrl: string,
  score: number,
  scored: boolean
};

type ShelfData = {
  id: number,
  books: BookData[],
  name: string,
  default: boolean,
  bookscount: number
};
