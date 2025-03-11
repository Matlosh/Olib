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
  body?: any,
  stringifyBody: boolean = true)
: Promise<ApiResponse | T> {
  try {
    const requestInit: RequestInit = {
      method: method,
      headers: {
        'Cookie': await getCookieString(),
        ...headers
      }
    };

    if(body && stringifyBody) {
      requestInit.body = JSON.stringify(body); 
    } else {
      requestInit.body = body;
    }

    if(['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      if(stringifyBody) {
        requestInit.headers = {
          'Content-Type': 'application/json',
          ...requestInit.headers
        };
      }
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
