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
