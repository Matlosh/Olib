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