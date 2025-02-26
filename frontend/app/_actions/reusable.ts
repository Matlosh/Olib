import {cookies} from "next/headers";

export async function getCookieString(): Promise<string> {
  try {
    const cookieStore = await cookies();
    return cookieStore.toString();
  } catch(err) {
    return '';
  }
}
