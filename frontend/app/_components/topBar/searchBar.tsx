'use client';

import {Input} from "@heroui/react";
import { useEffect, useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useDebounce } from "use-debounce";
import SearchBooks from "./searchBooks";

export default function SearchBar() {
  const [phrase, setPhrase] = useState('');
  const [value] = useDebounce(phrase, 300);

  return (
    <div className="absolute left-1/2 right-1/2 -translate-x-1/2 w-[400px] flex flex-row gap-2">
      <Input
        placeholder="Search in your library here..."
        startContent={
          <HiMiniMagnifyingGlass />
        }
        className="w-full flex-1"
        onInput={e => setPhrase(e.currentTarget.value)}
      />

      <SearchBooks name={value} />

      <div className="w-[40px] h-[40px] bg-amber-500 rounded-medium flex items-center justify-center hover:bg-amber-600 duration-150 cursor-pointer">
        <HiMiniMagnifyingGlass className="text-white text-2xl" />
      </div>
    </div>
  );
}
