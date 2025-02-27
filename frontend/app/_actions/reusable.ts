import {cookies} from "next/headers";
import {ApiResponse} from "../_utils/reusable";

export async function getCookieString(): Promise<string> {
  try {
    const cookieStore = await cookies();
    return cookieStore.toString();
  } catch(err) {
    return '';
  }
}

export async function apiFetch<T = ApiResponse>(
  func: (data: ApiResponse | T, response: Response) => Promise<ApiResponse | T>,
  url: string,
  method: string,
  headers?: { [key: string]: string }, 
  body?: any)
: Promise<ApiResponse | T> {
  try {
    const requestInit: RequestInit = {
      method: method,
      headers: {
        'Cookie': await getCookieString(),
        ...headers
      }
    };

    if(body) {
      requestInit.body = JSON.stringify(body); 
    }

    if(['POST', 'PUT', 'PATCH'].includes(method)) {
      requestInit.headers = {
        ...requestInit.headers,
        'Content-Type': 'application/json'
      };
    }

    const response = await fetch(url, requestInit);

    return await func(await response.json(), response);
  } catch(err) {
    return {
      success: false,
      status: 500,
      message: "Something went wrong while connecting to the server."
    };
  }
}
