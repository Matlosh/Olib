'use server';

import {apiFetch} from "../reusable";

export async function addBook(prevState: any, formData: FormData) {
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/add`,
    'POST',
    {},
    Object.fromEntries(formData)
  );
}

export async function editBook(prevState: any, formData: FormData) {
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/edit`,
    'PUT',
    {},
    Object.fromEntries(formData)
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
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/detach`,
    'DELETE',
    {},
    Object.fromEntries(formData)
  ); 
}

export async function getBookDataByISBN(isbn: string) {
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/books/isbn/${isbn}`,
    'GET'
  );
}

export async function uploadCover(prevState: any, formData: FormData) {
  const bookId = formData.get('id');

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
