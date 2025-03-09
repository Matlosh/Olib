'use client';

import {useEffect} from "react";
import BookCard from "../bookCard/bookCard";
import { PiBooksFill } from "react-icons/pi";
import { BsArrowRightSquareFill } from "react-icons/bs";
import Link from "next/link";
import {Tooltip} from "@heroui/react";

type ShelfCardProps = {
  shelf: ShelfData,
  maxSize?: number,
  // If true, then last element is a link to the shelf's page
  isLastALink?: boolean 
};

export default function ShelfCard({
  shelf,
  maxSize = 3,
  isLastALink = false
}: ShelfCardProps) {
  useEffect(() => {
    console.log(shelf);
  }, []);

  return (
    <div className="w-full h-auto flex flex-col justify-end pt-11">
      <div className="pb-8">
        <h1 className="text-2xl font-bold">{shelf.name}</h1>
      </div>

      <div className="w-full flex flex-row justify-between">
        <div className="w-[100px]"></div>

        {shelf.books.slice(0, maxSize).map((book, i) => (
          <BookCard key={i} book={book} shelf={shelf} />
        ))}

        {isLastALink &&
          <div className="w-[100px] h-[200px] flex items-center justify-center">
            <Tooltip content="Check whole shelf" placement="left">
              <Link href={"/dashboard/shelves/" + shelf.id}>
                <BsArrowRightSquareFill className="text-5xl text-primary" />
              </Link>
            </Tooltip>
          </div>
        }
      </div>

      <div className="flex flex-col items-center perspective-500 shadow-[0px_20px_18px_-20px_rgba(0,0,0,0.71)]">
        <div className="h-20 rotate-x-66 w-[84.5%]">
          <div className="w-full h-full translate-y-[45px] bg-orange-950">

          </div>
        </div>

        <div className="w-full h-2 bg-orange-900 shadow-lg">

        </div>
      </div>
    </div>
  );
}
