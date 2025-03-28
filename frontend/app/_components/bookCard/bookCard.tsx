'use client';

import {excerptString, getImageFullUrl} from "@/app/_utils/reusable";
import {Image, Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/react";
import {useEffect, useState} from "react";
import Stars from "../stars/stars";
import BookInfoCard from "./bookInfoCard";
import clsx from "clsx";

type BookCardProps = {
  book: BookData,
  shelf: ShelfData,
  viewMode?: boolean
};

export default function BookCard({
  book,
  shelf,
  viewMode = false
}: BookCardProps) {
  const [isInfoBoxOpened, setIsInfoBoxOpened] = useState(false);

  return (
    <>
      <div
        className="flex flex-row justify-center h-[200px] rounded-xl w-full max-w-[375px] cursor-pointer"
        onClick={() => setIsInfoBoxOpened(true)}>
        <div className="w-[150px] h-full rounded-xl shadow-2xl">
          <Image
            isBlurred
            alt={book.name}
            fallbackSrc={'/images/book-placeholder.webp'}
            src={book.imageUrl.length > 0 ? getImageFullUrl(book.imageUrl) : '/images/book-placeholder.webp'}
            width={150}
            height={200}
            className="object-cover"
            classNames={{
              wrapper: 'bg-cover'
            }}
          />
        </div>

        <div className="flex-1 p-4 flex-col gap-2 flex md:hidden 2xl:flex overflow-hidden">
          <div className={clsx(!book.scored && 'invisible')}>
            <Stars value={book.score} maxValue={100} maxStars={5} />
          </div>
          <h3 className="text-lg font-bold">{excerptString(book.name, 60)}</h3>
          <p>{book.author}</p>
        </div>
      </div>

      <Modal
        isOpen={isInfoBoxOpened}
        onClose={() => setIsInfoBoxOpened(false)}
        size="3xl"
        placement="center"
        scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <BookInfoCard
                  book={book}
                  shelf={shelf}
                  viewMode={viewMode}
                  onBookDelete={_ => setIsInfoBoxOpened(false)}
                  /> 
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
