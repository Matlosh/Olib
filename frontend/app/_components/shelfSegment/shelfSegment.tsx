'use client';

import {LibraryContext} from "@/app/_providers/libraryProvider";
import {useContext, useEffect, useState} from "react";
import BookCard from "../bookCard/bookCard";
import { Modal, ModalBody, ModalContent, Skeleton, Tooltip, addToast } from "@heroui/react";
import { PiNotePencilBold } from "react-icons/pi";
import ShelfForm from "../shelfForm/shelfForm";
import BooksProvider, { BooksContext } from "@/app/_providers/booksProvider";
import { RiDeleteBinFill } from "react-icons/ri";
import AcceptRejectModal from "../acceptRejectModal/acceptRejectModal";
import { updateShelfLibraryContext } from "@/app/_helpers/contexts/library";
import { deleteShelf } from "@/app/_actions/shelves/actions";
import { useRouter } from "next/navigation";

// First page should be already provided to prevent loading at start
type ShelfSegmentProps = {
  id: string,
  firstPageBooks: BookData[]
};

export default function ShelfSegment({
  id,
  firstPageBooks
}: ShelfSegmentProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shelf, setShelf] = useState<ShelfData | null>(null);
  const [books, setBooks] = useState(firstPageBooks);
  const libraryContext = useContext(LibraryContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const shelf = libraryContext.value.find(shelf => shelf.id === Number(id)); 

    if(shelf) {
      setShelf(shelf);
    }

    setIsLoaded(true);
  }, [id]);

  const deleteThisShelf = () => {
    (async () => {
      const formData = new FormData();
      formData.append('id', id);

      let isSuccess = false;

      try {
        const response = await deleteShelf(null, formData);

        if(response.success) {
          isSuccess = true;
        }
      } catch(err) {}

      if(isSuccess) {
        router.push('/dashboard');
      } else {
        addToast({
          title: 'Error',
          description: 'Could not delete this shelf. Please try again.',
          color: 'danger'
        });
      }
    })();
  };
  
  return (
    <div>
      <div className="flex flex-col py-8 items-center gap-8">
        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-2 items-center relative">
            {isLoaded && shelf && 
              <>
                <h1 className="text-2xl font-bold text-center">{shelf.name}</h1>
                <Tooltip content="Edit shelf info">
                  <PiNotePencilBold
                    className="absolute text-lg top-1/2 -translate-y-[60%] left-[calc(100%+0.5rem)] cursor-pointer"
                    onClick={_ => setIsModalOpen(true)} />
                </Tooltip>

                <Tooltip content="Delete shelf" color="danger">
                  <RiDeleteBinFill
                    className="absolute text-lg top-1/2 -translate-y-[60%] left-[calc(100%+2rem)] cursor-pointer text-red-500"
                    onClick={_ => setIsAcceptModalOpen(true)} />
                </Tooltip>

              </> 
            }

            {!isLoaded &&
              <Skeleton className="w-[200px] h-[20px] rounded-lg"></Skeleton> 
            }
          </div>

          {isLoaded && shelf &&
            <p className="text-lg font-semibold italic">Books count: {shelf.booksCount}</p>
          }

          {!isLoaded &&
            <Skeleton className="w-[150px] h-[20px] mt-2 rounded-lg"></Skeleton>
          }

          {isLoaded && !shelf &&
            <h1 className="text-2xl font-bold text-center">Shelf not found.</h1>
          }
        </div>

        <div className="w-full md:w-auto grid grid-cols-1 md:grid-cols-4 gap-8 justify-center">
          <BooksProvider books={books} setBooks={setBooks}>
            <>
              {isLoaded && shelf &&
                <>
                  {books.map((book, i) => (
                    <BookCard key={i} book={book} shelf={shelf} />
                  ))}
                </>
              }
            </>
          </BooksProvider>
          
          {!isLoaded &&
            <>
              {Array.from(Array(12).keys()).map(i => (
                <div className="flex flex-row justify-between gap-4" key={i}>
                  <Skeleton className="w-full max-w-[150px] h-[200px] rounded-lg">
                    <div className="w-[150px] h-[200px]"></div>
                  </Skeleton>

                  <Skeleton className="w-full max-w-[200px] h-[200px] rounded-lg">
                    <div className="w-[200px] h-[200px]"></div>
                  </Skeleton>
                </div>
              ))} 
            </>
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
            <ModalBody>
              <ShelfForm
                editMode={true}
                shelf={shelf !== null ? shelf : undefined}
                setShelf={shelf => {
                  setShelf(shelf);
                  updateShelfLibraryContext(libraryContext, shelf);
                }}/>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      <AcceptRejectModal
        isOpen={isAcceptModalOpen}
        setIsOpen={setIsAcceptModalOpen}
        message="Do you really want to remove this shelf (Books won't be deleted)?"
        onAccept={deleteThisShelf}
        onReject={() => setIsAcceptModalOpen(false)} />
    </div>
  );
}
