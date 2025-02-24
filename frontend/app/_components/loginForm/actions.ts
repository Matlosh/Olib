'use server';

import {ApiResponse} from "@/app/_utils/reusable";
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {cookies} from "next/headers";

export async function login(prevState: any, formData: FormData) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    // next session should be sent to the backend with every request

    const json = (await response.json()) as ApiResponse;
  
    const cookieStore = await cookies();
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
