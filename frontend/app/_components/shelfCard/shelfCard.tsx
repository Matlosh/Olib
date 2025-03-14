'use client';

import BookCard from "../bookCard/bookCard";
import { BsArrowRightSquareFill } from "react-icons/bs";
import Link from "next/link";
import {Button, Modal, ModalBody, ModalContent, Tooltip} from "@heroui/react";
import { useContext, useState } from "react";
import { LibraryContext } from "@/app/_providers/libraryProvider";
import BookForm from "../bookForm/bookForm";
import { updateShelvesLibraryContext } from "@/app/_helpers/contexts/library";

type ShelfCardProps = {
  shelf: ShelfData,
  maxSize?: number,
  // If true, then last element is a link to the shelf's page
  isLastALink?: boolean,
  viewMode?: boolean,
  constructShelfUrl?: (shelfId: string) => string
};

const getShelfUrl = (shelfId: string): string => {
  return `/dashboard/shelves/${shelfId}`;
};

export default function ShelfCard({
  shelf,
  maxSize = 3,
  isLastALink = false,
  viewMode = false,
  constructShelfUrl = getShelfUrl
}: ShelfCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const libraryContext = useContext(LibraryContext);

  return (
    <>
      <div className="w-full h-auto flex flex-col justify-end">
        <div className="pb-8 w-full flex flex-row justify-center">
          <h1 className="text-2xl font-bold text-center">{shelf.name}</h1>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          <div className="hidden md:block w-[100px]"></div>

          {shelf.books.slice(0, maxSize).map((book, i) => (
            <BookCard
              key={i}
              book={book}
              shelf={shelf}
              viewMode={viewMode} />
          ))}

          {shelf.booksCount === 0 && shelf.books.length === 0 &&
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <h2 className="text-xl font-bold">Nothing here, yet :(</h2>
              {!viewMode &&
                <Button
                  color="primary"
                  onPress={() => setIsModalOpen(true)}>
                  Fill me in!
                </Button>} 
            </div> 
          }

          {isLastALink &&
            <div className="w-full md:w-[100px] md:h-[200px] flex items-center justify-center">
              <div className="block md:hidden">
                <Button
                  color="primary"
                  as={Link}
                  href={constructShelfUrl(shelf.id.toString())}>See all</Button>
              </div>

              <div className="w-full h-full hidden md:flex items-center justify-center">
                <Tooltip
                  content="Check whole shelf"
                  placement="left">
                  <Link href={constructShelfUrl(shelf.id.toString())}>
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

      <Modal
        isOpen={isModalOpen}
        size="xl"
        onClose={() => setIsModalOpen(false)}
        placement="center">
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <BookForm
                onBookSave={(nextBook) => {
                  updateShelvesLibraryContext(libraryContext, undefined, nextBook, false);
                }} />
            </ModalBody> 
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
