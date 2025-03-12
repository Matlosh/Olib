'use server';

import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {cookies} from "next/headers";
import {apiFetch} from "../reusable";
import {ApiResponse} from "@/app/_utils/reusable";

export async function loginUser(prevState: any, formData: FormData) {
  return await apiFetch(
    async (json, response) => {
      const cookieStore = await cookies();

      for(const cookie of response.headers.getSetCookie()) {
        const parsedCookie = parseSetCookie(cookie);
        if(parsedCookie?.name === 'SESSION') {
          cookieStore.set('SESSION', parsedCookie.value);
        }
      }

      return json; 
    },
    `${process.env.BACKEND_URL}/user/login`,
    'POST',
    {},
    Object.fromEntries(formData)
  );
}

export async function registerUser(prevState: any, formData: FormData) {
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/user/register`,
    'POST',
    {},
    Object.fromEntries(formData)
  );
}

export async function logoutUser() {
  return await apiFetch(
    async (json) => json,
    `${process.env.BACKEND_URL}/user/logout`, 
    'POST'
  );
}

export async function getMe(): Promise<ApiResponse | UserData> {
  return await apiFetch<UserData>(
    async (json) => json,
    `${process.env.BACKEND_URL}/user`,
    'GET'
  );
}

export async function getUserStats() {
  return await apiFetch<StatsData>(
    async (json) => json,
    `${process.env.BACKEND_URL}/user/stats`,
    'GET'
  );
}