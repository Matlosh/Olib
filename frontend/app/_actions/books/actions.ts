'use server';

import {ApiResponse} from "@/app/_utils/reusable";
import {apiFetch} from "../reusable";

// Prepares body for the book API
function prepareBody(body: { [key: string]: any }, formData: FormData) {
  const shelves: string[] = formData.getAll('shelves') as string[];
  const shelfIds: number[] = shelves.map(shelf => Number(shelf));

  body.shelves = shelfIds;
}

export async function getBookShelves(bookId: number) {
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/${bookId}/shelves`,
    'GET'
  );
}

export async function addBook(prevState: any, formData: FormData): Promise<ApiResponse | BookData> {
  let body = Object.fromEntries(formData);
  prepareBody(body, formData);

  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/add`,
    'POST',
    {},
    body
  );
}

export async function editBook(prevState: any, formData: FormData): Promise<ApiResponse | BookData> {
  let body = Object.fromEntries(formData);
  prepareBody(body, formData);

  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/edit`,
    'PUT',
    {},
    body
  );
}

export async function deleteBook(prevState: any, formData: FormData) {
  const deleteId = formData.get('id');

  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/delete/${deleteId}`,
    'DELETE'
  );
}

export async function attachBook(prevState: any, formData: FormData) {
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/attach`,
    'POST',
    {},
    Object.fromEntries(formData)
  );
}

export async function detachBook(prevState: any, formData: FormData) {
  // TODO: Fix backend not approving of request error
  let body = Object.fromEntries(formData) as {[key: string]: any};
  prepareBody(body, formData);

  body.bookId = Number(body.bookId);

  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/detach`,
    'DELETE',
    {},
    body 
  ); 
}

export async function getBookDataByISBN(isbn: string) {
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/isbn/${isbn}`,
    'GET'
  );
}

export async function uploadCover(prevState: any, formData: FormData): Promise<ApiResponse | CoverData> {
  const bookId = formData.get('id');

  // TODO: Fix backend not approving of request error
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/${bookId}/cover/upload`,
    'POST',
    {
      'Content-Type': 'multipart/form-data'
    },
    formData,
    false
  );
}

export async function deleteCover(prevState: any, formData: FormData) {
  const bookId = formData.get('id');

  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/${bookId}/cover/delete`,
    'DELETE'
  );
}
