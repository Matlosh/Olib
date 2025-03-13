'use server';

import { cache } from "react";
import { getPublicLibrary as getPublicLibraryAction } from "../_actions/libraries/actions";

export const getPublicLibrary = cache(async (id: number) => {
  return await getPublicLibraryAction(id);
});