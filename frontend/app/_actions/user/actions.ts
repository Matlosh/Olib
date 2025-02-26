'use server';

import {ApiResponse} from "@/app/_utils/reusable";
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {cookies} from "next/headers";
import {getCookieString} from "../reusable";

export async function loginUser(prevState: any, formData: FormData) {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${process.env.BACKEND_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieStore.toString()
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    const json = (await response.json()) as ApiResponse;
  
    for(const cookie of response.headers.getSetCookie()) {
      const parsedCookie = parseSetCookie(cookie);
      if(parsedCookie?.name === 'SESSION') {
        cookieStore.set('SESSION', parsedCookie.value);
      }
    }

    return json; 
  } catch(err) {
    return {
      success: false,
      status: 500,
      message: "Something went wrong while connecting to the server."
    };
  }
}

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    const json = (await response.json()) as ApiResponse;
    return json; 
  } catch(err) {
    return {
      success: false,
      status: 500,
      message: "Something went wrong while connecting to the server."
    };
  }
}

export async function getMe() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/user`, {
      method: 'GET',
      headers: {
        'Cookie': await getCookieString()
      }
    });

    const json = (await response.json()) as (ApiResponse | UserData);
    return json; 
  } catch(err) {
    return {
      success: false,
      status: 500,
      message: "Something went wrong while connecting to the server."
    };
  }
}
