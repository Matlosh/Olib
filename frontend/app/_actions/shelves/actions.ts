'use server';

import {ApiResponse} from "@/app/_utils/reusable";
import {apiFetch} from "../reusable";

export async function getUserShelves(): Promise<ApiResponse | ShelfData[]> {
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/shelves`,
    'GET'
  );
}

export async function getShelfBooks(shelfId: number, page: number): Promise<ApiResponse | BookData[]> {
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/shelves/${shelfId}/books?page=${page}`,
    'GET'
  );
}

export async function addShelf(prevState: any, formData: FormData) {
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/shelves/add`,
    'POST',
    {},
    Object.fromEntries(formData)
  );
}

export async function editShelf(prevState: any, formData: FormData) {
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/shelves/edit`,
    'PUT',
    {},
    Object.fromEntries(formData)
  );
}

export async function deleteShelf(prevState: any, formData: FormData) {
  const deleteId = formData.get('id');

  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/shelves/delete/${deleteId}`,
    'DELETE'
  );
}
