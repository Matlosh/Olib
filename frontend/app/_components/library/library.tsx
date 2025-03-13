'use client';

import {useContext} from "react";
import ShelfCard from "../shelfCard/shelfCard";
import {LibraryContext} from "@/app/_providers/libraryProvider";

export default function Library() {
  const libraryContext = useContext(LibraryContext);

  return (
    <div className="w-full flex flex-col gap-11">
      {libraryContext.value.map((shelf) => (
        <ShelfCard
          key={shelf.id}
          shelf={shelf}
          isLastALink={true} />
      ))}
    </div>
  );
}
