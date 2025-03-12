'use server';

import { apiFetch } from "../reusable";

export async function getUserLibrary() {
  return await apiFetch<LibraryData>(
    async (json) => json,
    `${process.env.BACKEND_URL}/library`,
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