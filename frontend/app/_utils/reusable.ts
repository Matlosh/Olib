import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type ApiResponse = {
  success: boolean;
  status: number;
  message: string;
};

export const apiInitialState = {
  success: false,
  status: 500,
  message: ""
};

export function excerptString(text: string, length: number, suffix: string = '...'): string {
  if(text.length <= length) {
    return text;
  }

  let words: string[] = [];
  let currentLength = 0;

  text.split(' ').forEach(word => {
    if(currentLength + word.length <= length) {
      words.push(word);
      currentLength += (word.length + 1);
    }
  });

  return words.join(' ') + suffix;
}

export function getImageFullUrl(imageUrl: string): string {
  return imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${imageUrl}`;
}
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}