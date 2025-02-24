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
