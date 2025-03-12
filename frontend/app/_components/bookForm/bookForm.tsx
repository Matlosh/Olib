'use client';

import {addShelf, editShelf, getUserShelves} from "@/app/_actions/shelves/actions";
import {ApiResponse, apiInitialState} from "@/app/_utils/reusable";
import {Button, Checkbox, Form, Input, Select, SelectItem, Spinner, addToast} from "@heroui/react";
import {startTransition, useActionState, useContext, useEffect, useRef, useState} from "react";
import FormStatus, {StatusMessage} from "../formStatus/formStatus";
import {addBook, editBook, getBookDataByISBN, getBookShelves, uploadCover} from "@/app/_actions/books/actions";
import useFormInput from "@/app/_hooks/useFormInput";
import {LibraryContext} from "@/app/_providers/libraryProvider";

type BookFormProps = {
  editMode?: boolean,
  book?: BookData
};

type BookStringKeys = 'name' | 'author' | 'isbn' | 'imageUrl';

export default function BookForm({
  editMode = false,
  book
}: BookFormProps) {
  const [state, formAction, pending] = useActionState(editMode ? editBook : addBook, apiInitialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [isbnSearchPending, setIsbnSearchPending] = useState(false);
  const [allShelves, setAllShelves] = useState<ShelfData[]>([]);
  const libraryContext = useContext(LibraryContext);
  const [customFormStatusMessage, setCustomFormStatusMessage] = useState<StatusMessage>({
    message: '',
    status: 'error'
  });

  const fields = {
    name: useFormInput(''),
    author: useFormInput(''),
    isbn: useFormInput(''),
    imageUrl: useFormInput(''),
    score: useFormInput(0),
    isScored: useFormInput<boolean>(false),
    shelves: useFormInput<number[]>([]),
    uploadCoverFromURL: useFormInput<boolean>(false),
    uploadedFile: useFormInput<File | null>(null)
  };

  useEffect(() => {
    if(editMode && book) {
      ['name', 'author', 'isbn', 'imageUrl'].forEach(key => {
        fields[key as BookStringKeys].setValue(book[key as BookStringKeys]);
      });

      fields.score.setValue(book.score);
      fields.isScored.setValue(book.scored);
      fields.shelves.setValue(book.shelvesIds);
      
      if(book.imageUrl.trim().length > 0) {
        fields.imageUrl.setValue(book.imageUrl);
        fields.uploadCoverFromURL.setValue(true);
      }
    }
  }, [editMode, book]);

  useEffect(() => {
    setCustomFormStatusMessage({
      message: '',
      status: 'error'
    });

    resetFormWhenSent();
    updateShelvesLibraryContext();

    (async () => {
      const coverUrl = await uploadBookCover();
      updateCoverLibraryContext(coverUrl);
    })();
  }, [state]);

  useEffect(() => {
    (async () => {
      try {
        const shelves = await getUserShelves();
        if(!('message' in shelves)) {
          setAllShelves(shelves);
        }
      } catch(err) {
        addToast({
          title: 'Fetching shelves has failed.',
          description: 'Server failed.',
          color: 'danger'
        });
      }
    })();
  }, []);

  const uploadBookCover = async (): Promise<string> => {
    if('id' in state && state.id && fields.uploadedFile.value !== null) {
      const formData = new FormData();
      formData.append('id', state.id.toString());
      formData.append('file', fields.uploadedFile.value);

      const coverUploadData = await uploadCover(null, formData);

      if(!('message' in coverUploadData)) {
        if(editMode) {
          fields.imageUrl.setValue(coverUploadData.imageUrl);
          fields.uploadCoverFromURL.setValue(true);
          return coverUploadData.imageUrl;
        }
      } else {
        const formStatusMessage = {...customFormStatusMessage};
        formStatusMessage.message = coverUploadData.message;
        formStatusMessage.status = 'error';

        setCustomFormStatusMessage(formStatusMessage);
      }
    }

    return '';
  };

  const resetFormWhenSent = () => {
    if(!editMode && 'id' in state && state.id && formRef.current) {
      formRef.current.reset();

      for(const field of Object.values(fields)) {
        field.reset();
      }
    }
  };

  const updateShelvesLibraryContext = () => {
    if(libraryContext.value && 'id' in state && state.id) {
      const shelves = [...libraryContext.value];
      if(editMode) {
        if(book) {
          const oldShelvesIds = book.shelvesIds;
          const newShelvesIds = fields.shelves.value;

          const shelvesToRemove = oldShelvesIds.filter(id => !newShelvesIds.includes(id));
          const shelvesToAdd = newShelvesIds.filter(id => !oldShelvesIds.includes(id));

          if(shelvesToRemove.length > 0) {
            for(const shelf of shelves) {
              if(shelvesToRemove.includes(shelf.id)) {
                shelf.books = shelf.books.filter(book => book.id !== state.id);
              }
            }
          }

          if(shelvesToAdd.length > 0) {
            for(const shelf of shelves) {
              if(shelvesToAdd.includes(shelf.id)) {
                shelf.books.push(state);
              }
            }
          }

        }
      } else {
        for(const shelf of shelves) {
          if(fields.shelves.value.includes(shelf.id)) {
            shelf.books.push(state);
          }
        }
      }

      libraryContext.setValue(shelves);
    }
  };

  const updateCoverLibraryContext = (coverUrl: string) => {
    if(libraryContext.value && 'id' in state && state.id && coverUrl.length > 0) {
      const shelves = [...libraryContext.value];

      for(const shelf of shelves) {
        for(const book of shelf.books) {
          if(book.id === state.id) {
            book.imageUrl = coverUrl;
          }
        }
      }

      libraryContext.setValue(shelves);
    };
  }

  const fillDetailsByISBN = () => {
    (async () => {
      setIsbnSearchPending(true);
      try {
        const bookData = await getBookDataByISBN(fields.isbn.value);
        let isOkay = false;

        for(const [key, value] of Object.entries(bookData)) {
          if(key in ['name', 'author', 'isbn', 'imageUrl']) {
            if(value.toString().length > 0) {
              isOkay = true;
            }

            if(key === 'imageUrl' && value.toString().length > 0) {
              fields.uploadCoverFromURL.setValue(true);
            }

            const field = fields[(key as 'name' | 'author' | 'isbn' | 'imageUrl')];

            // ISBN Api returns only strings
            field.setValue(value.toString());
          }
        }

        if(isOkay) {
          addToast({
            title: 'The applicable data was filled in.',
            color: 'success'
          });
        } else {
          addToast({
            title: 'Fetching data by ISBN has failed.',
            description: 'Could not find book with ISBN like this.',
            color: 'danger'
          });
        }
      } catch(err) {
        addToast({
          title: 'Fetching data by ISBN has failed.',
          description: 'Server failed.',
          color: 'danger'
        });
      }
      setIsbnSearchPending(false);
    })();
  };

  return (
    <div className="flex flex-col gap-2 pt-2 overflow-scroll">
      <h1 className="text-xl font-bold">
        {editMode ?
          'Edit an existing book'
          :
          'Add a new book'
        }
      </h1>

      <Form
        action={formAction}
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(() => formAction(new FormData(e.currentTarget)));
        }}
        ref={formRef}>

        {editMode && book && 
          <Input
            hidden
            name="id"
            value={book.id.toString()}
            className="hidden" />
        }

        <Input
          isRequired
          label="Name"
          errorMessage="Please enter correct name"
          labelPlacement="inside"
          name="name"
          type="text"
          value={fields.name.value}
          onInput={e => fields.name.setValue(e.currentTarget.value)}
        /> 
        
        <Input
          isRequired
          label="Author"
          errorMessage="Please enter correct author"
          labelPlacement="inside"
          name="author"
          type="text"
          value={fields.author.value}
          onInput={e => fields.author.setValue(e.currentTarget.value)}
        /> 

        <Input
          label="ISBN"
          errorMessage="Please enter correct ISBN"
          labelPlacement="inside"
          name="isbn"
          type="text"
          value={fields.isbn.value}
          onInput={e => fields.isbn.setValue(e.currentTarget.value)}
        />

        {fields.isbn.value.trim().length >= 10 &&
          <div className="flex flex-row gap-4">
            <Button
              type="button"
              color="primary"
              onPress={_ => fillDetailsByISBN()}>
              Fill book details via ISBN 
            </Button>

            {isbnSearchPending && 
              <Spinner />
            }
          </div>
        }

        {!fields.uploadCoverFromURL.value &&
          <Input
            label="Cover photo"
            errorMessage="Please upload correct cover photo"
            labelPlacement="inside"
            name="file"
            type="file"
            onChange={e => fields.uploadedFile.setValue(e.currentTarget.files?.item(0) || null)}
          />
        }

        {fields.uploadCoverFromURL.value &&
          <Input
            label="Cover photo URL"
            errorMessage="Please enter correct cover photo URL"
            labelPlacement="inside"
            name="imageUrl"
            type="text"
            value={fields.imageUrl.value}
            onInput={e => fields.imageUrl.setValue(e.currentTarget.value)}
          />
        }

        <Checkbox
          isSelected={fields.uploadCoverFromURL.value}
          onChange={e => fields.uploadCoverFromURL.setValue(e.currentTarget.checked)}>
          Upload cover via image URL</Checkbox>

        <Select
          label="Shelves"
          placeholder="Select book's shelves"
          selectionMode="multiple"
          name="shelves"
          selectedKeys={fields.shelves.value.map(id => id.toString())}
          onSelectionChange={keys => fields.shelves.setValue(Array.from(keys).map(value => Number(value)))}>
          {allShelves.map(shelf => (
            <SelectItem key={shelf.id}>{shelf.name}</SelectItem>
          ))} 
        </Select>

        <Checkbox
          name="scored"
          onChange={e => fields.isScored.setValue(e.currentTarget.checked)}
          value="true">
          Add a score</Checkbox>

        {fields.isScored.value &&
          <Input
            isRequired
            label="Score"
            errorMessage="Please select correct score between 0 and 100"
            labelPlacement="inside"
            name="score"
            type="number"
            min="0"
            max="100"
            value={fields.score.value.toString()}
            onInput={e => fields.score.setValue(Number(e.currentTarget.value))}
          />
        }

        <Button type="submit" color="primary">
          {editMode ? "Edit" : "Add"}
        </Button>
      </Form>

      <FormStatus
        formState={state}
        pending={pending}
        successProperty="id"
        successMessage={
          editMode ?
            "Book has been edited successfully."
            :
            "Book has been added successfully."
        }
        customMessage={customFormStatusMessage}
      />
    </div>
  );
}
