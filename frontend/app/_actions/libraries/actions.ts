'use server';

import { apiFetch } from "../reusable";

export async function getUserLibrary() {
  return await apiFetch<LibraryData>(
    async (json) => json,
    `${process.env.BACKEND_URL}/library`,
    'GET'
  );
}

export async function getPublicLibrary(libraryId: number) {
  return await apiFetch<PublicLibraryData>(
    async (json) => json,
    `${process.env.BACKEND_URL}/libraries/${libraryId}`,
    'GET'
  );
}

export async function getPublicLibraryStats(libraryId: number) {
  return await apiFetch<StatsData>(
    async (json) => json,
    `${process.env.BACKEND_URL}/libraries/${libraryId}/stats`,
    'GET'
  );
}

export async function getPublicLibraryShelf(libraryId: number, shelfId: number) {
  return await apiFetch<ShelfData>(
    async (json) => json,
    `${process.env.BACKEND_URL}/libraries/${libraryId}/shelves/${shelfId}`,
    'GET'
  );
}

export async function getPublicLibraryShelfBooks(libraryId: number, shelfId: number, page: number) {
  return await apiFetch<BookData[]>(
    async (json) => json,
    `${process.env.BACKEND_URL}/libraries/${libraryId}/shelves/${shelfId}/books?page=${page}`,
    'GET'
  );
}

export async function editUserLibrary(prevState: any, formData: FormData) {
  const body = Object.fromEntries(formData) as {[key: string]: any};
  body.public = formData.get('public') === 'true';

  return await apiFetch<LibraryData>(
    async (json) => json,
    `${process.env.BACKEND_URL}/libraries/edit`,
    'PUT',
    {},
    body
  );
}