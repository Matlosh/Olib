'use client';

import {Button, Card, CardBody, CardHeader, Image, Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/react";
import Stars from "../stars/stars";
import {excerptString, getImageFullUrl} from "@/app/_utils/reusable";
import {useContext, useState} from "react";
import ShelfForm from "../shelfForm/shelfForm";
import BookForm from "../bookForm/bookForm";
import {detachBook} from "@/app/_actions/books/actions";
import {LibraryContext} from "@/app/_providers/libraryProvider";

type BookInfoCardProps = {
  book: BookData,
  shelf: ShelfData
}

export default function BookInfoCard({
  book,
  shelf
}: BookInfoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const libraryContext = useContext(LibraryContext);

  const detachBookFromShelf = () => {
    (async () => {
      const formData = new FormData();
      formData.append('bookId', book.id.toString());
      formData.append('shelves', shelf.id.toString());

      const response = await detachBook(null, formData);
      console.log(response);
      if(response.success) {
        updateLibraryContext();
      }
    })();
  };

  const updateLibraryContext = () => {
    const shelves = [...libraryContext.value];

    const matchingShelf = shelves.find(s => s.id === shelf.id);
    if(matchingShelf) {
      matchingShelf.books = matchingShelf.books.filter(b => b.id !== book.id);
    }

    libraryContext.setValue(shelves);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 py-8">
        <div className="w-full lg:w-fit flex items-center justify-center">
          <Image
            isBlurred
            alt={book.name}
            src={book.imageUrl.length > 0 ? getImageFullUrl(book.imageUrl) : '/images/book-placeholder.webp'}
            width={300}
            height={400}
            className="object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <Stars value={book.score} maxValue={100} maxStars={5} />
          <h3 className="text-lg font-bold">{book.name}</h3>
          <p>{book.author}</p>
          <p>ISBN: {book.isbn}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              color="default"
              onPress={_ => setIsModalOpen(true)}>
              Edit
            </Button>

            {!shelf.default && 
              <Button
                color="warning"
                onPress={detachBookFromShelf}>
                Remove from this shelf
              </Button>
            }

            <Button color="danger">
              Delete
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}>
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <BookForm
                editMode
                book={book} />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
