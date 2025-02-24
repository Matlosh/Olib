'use server';

import {ApiResponse} from "@/app/_utils/reusable";

export async function register(prevState: any, formData: FormData) {
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
