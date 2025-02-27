/* Types mapping the responses from the Spring API */

type UserData = {
  nick: string
};

type BookData = {
  id: number,
  shelvesids: number[],
  name: string,
  author: string,
  isbn: string,
  imageurl: string,
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
