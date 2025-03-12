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
  booksCount: number
};

type CoverData = {
  imageUrl: string
};

type LibraryData = {
  id: number,
  public: boolean
};

type ScoreData = {
  score: number,
  count: number
};

type StatsData = {
  booksCount: number,
  shelvesCount: number,
  averageScore: number,
  scores: ScoreData[]
};