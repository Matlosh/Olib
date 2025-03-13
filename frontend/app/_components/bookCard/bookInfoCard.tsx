'use client';

import {Button, Card, CardBody, CardHeader, Image, Modal, ModalBody, ModalContent, ModalHeader, Tooltip, addToast} from "@heroui/react";
import Stars from "../stars/stars";
import {getImageFullUrl} from "@/app/_utils/reusable";
import {useContext, useState} from "react";
import BookForm from "../bookForm/bookForm";
import {deleteBook, detachBook} from "@/app/_actions/books/actions";
import {LibraryContext} from "@/app/_providers/libraryProvider";
import AcceptRejectModal from "../acceptRejectModal/acceptRejectModal";
import { BooksContext } from "@/app/_providers/booksProvider";
import { updateBookDeleteLibraryContext, updateBooksLibraryContext, updateCoverLibraryContext, updateShelfBookRemoveLibraryContext, updateShelvesLibraryContext } from "@/app/_helpers/contexts/library";
import { updateBooksContext } from "@/app/_helpers/contexts/books";

type BookInfoCardProps = {
  book: BookData,
  shelf: ShelfData,
  viewMode?: boolean,
  onBookRemoveFromShelf?: (book: BookData, shelf: ShelfData) => void,
  onBookDelete?: (book: BookData) => void
}

export default function BookInfoCard({
  book,
  shelf,
  viewMode,
  onBookRemoveFromShelf,
  onBookDelete
}: BookInfoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const libraryContext = useContext(LibraryContext);
  const booksContext = useContext(BooksContext);

  const detachBookFromShelf = () => {
    (async () => {
      const formData = new FormData();
      formData.append('bookId', book.id.toString());
      formData.append('shelves', shelf.id.toString());

      try {
        const response = await detachBook(null, formData);

        if(response.success) {
          setIsModalOpen(false);
          updateShelfBookRemoveLibraryContext(libraryContext, shelf, book);
          onBookRemoveFromShelf && onBookRemoveFromShelf(book, shelf);        
        } else {
          addToast({
            title: 'Error',
            description: 'Something went wrong while removing the book from the shelf. Please try again.',
            color: 'danger'
          });
        }
      } catch(err) {
        addToast({
          title: 'Error',
          description: 'Internal server error. Please try again.',
          color: 'danger'
        });
      }
    })();
  };

  const removeBook = () => {
    (async () => {
      const formData = new FormData();
      formData.append('id', book.id.toString());

      try {
        const response = await deleteBook(null, formData);

        if(response.success) {
          setIsModalOpen(false);
          updateBookDeleteLibraryContext(libraryContext, book);
          onBookDelete && onBookDelete(book);
        } else {
          addToast({
            title: 'Error',
            description: 'Something went wrong while deleting the book. Please try again.',
            color: 'danger'
          });
        }
      } catch(err) {
        addToast({
          title: 'Error',
          description: 'Internal server error. Please try again.',
          color: 'danger'
        });
      }        
    })();
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

          {!viewMode &&
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

              <Button
                color="danger"
                onPress={_ => setIsAcceptModalOpen(true)}>
                Delete
              </Button>
            </div>
          }
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        placement="center"
        scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <ModalBody
            className="overflow-scroll">
              <BookForm
                editMode
                book={book}
                onBookSave={(nextBook: BookData) => {
                  updateBooksContext(booksContext, nextBook);
                  updateShelvesLibraryContext(libraryContext, book, nextBook, true);
                  updateBooksLibraryContext(libraryContext, nextBook);
                }}
                onBookCoverSave={(nextBook: BookData) => {
                  updateCoverLibraryContext(libraryContext, nextBook, nextBook.imageUrl);
                }} />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      <AcceptRejectModal
        isOpen={isAcceptModalOpen} 
        setIsOpen={setIsAcceptModalOpen}
        message="Do you really want to delete this book?"
        onAccept={removeBook}
      />
    </>
  );
}
