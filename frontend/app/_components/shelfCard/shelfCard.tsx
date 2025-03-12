'use client';

import {useEffect} from "react";
import BookCard from "../bookCard/bookCard";
import { BsArrowRightSquareFill } from "react-icons/bs";
import Link from "next/link";
import {Button, Tooltip} from "@heroui/react";

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
      <div className="pb-8 w-full flex flex-row justify-center">
        <h1 className="text-2xl font-bold text-center">{shelf.name}</h1>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between gap-8 md:gap-0">
        <div className="hidden md:block w-[100px]"></div>

        {shelf.books.slice(0, maxSize).map((book, i) => (
          <BookCard key={i} book={book} shelf={shelf} />
        ))}

        {isLastALink &&
          <div className="w-full md:w-[100px] md:h-[200px] flex items-center justify-center">
            <div className="block md:hidden">
              <Button
                color="primary"
                as={Link}
                href={"/dashboard/shelves/" + shelf.id}>See all</Button>
            </div>

            <div className="w-full h-full hidden md:flex items-center justify-center">
              <Tooltip
                content="Check whole shelf"
                placement="left">
                <Link href={"/dashboard/shelves/" + shelf.id}>
                  <BsArrowRightSquareFill className="text-5xl text-primary duration-150 hover:translate-x-2" />
                </Link>
              </Tooltip>
            </div>
          </div>
        }
      </div>

      <div className="flex flex-col items-center perspective-500 shadow-[0px_20px_18px_-20px_rgba(0,0,0,0.71)]">
        <div className="h-20 rotate-x-66 w-[84.5%]">
          <div className="w-full h-full translate-y-[45px] bg-orange-950"></div>
        </div>

        <div className="w-full h-2 bg-orange-900 shadow-lg"></div>
      </div>
    </div>
  );
}
