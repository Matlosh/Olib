'use client';

import {addShelf, editShelf} from "@/app/_actions/shelves/actions";
import {apiInitialState} from "@/app/_utils/reusable";
import {Button, Checkbox, Form, Input, Spinner, addToast} from "@heroui/react";
import {startTransition, useActionState, useEffect, useRef, useState} from "react";
import FormStatus from "../formStatus/formStatus";
import {addBook, editBook, getBookDataByISBN} from "@/app/_actions/books/actions";
import useFormInput from "@/app/_hooks/useFormInput";

export default function BookForm({ editMode = false }: { editMode?: boolean }) {
  const [state, formAction, pending] = useActionState(editMode ? editBook : addBook, apiInitialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [isScored, setIsScored] = useState(false);
  const [uploadCoverFromURL, setUploadCoverFromURL] = useState(false);
  const [isbnSearchPending, setIsbnSearchPending] = useState(false);

  const fields = {
    name: useFormInput(),
    author: useFormInput(),
    isbn: useFormInput(),
    imageUrl: useFormInput()
  };

  useEffect(() => {
    console.log(state);
    if('id' in state && state.id && formRef.current) {
      formRef.current.reset();

      for(const field of Object.values(fields)) {
        field.setValue('');
      }
    }
  }, [state]);

  const fillDetailsByISBN = () => {
    (async () => {
      setIsbnSearchPending(true);
      try {
        const bookData = await getBookDataByISBN(fields.isbn.value);
        let isOkay = false;

        for(const [key, value] of Object.entries(bookData)) {
          if(key in fields) {
            if(value.toString().length > 0) {
              isOkay = true;
            }

            if(key === 'imageUrl' && value.toString().length > 0) {
              setUploadCoverFromURL(true);
            }

            fields[(key as keyof typeof fields)].setValue(value.toString());
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
    <div className="flex flex-col gap-2 pt-2">
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

        <Input
          isRequired
          label="Name"
          errorMessage="Please enter correct name"
          labelPlacement="inside"
          name="name"
          type="text"
          value={fields.name.value}
          onInput={fields.name.onChange}
        /> 
        
        <Input
          isRequired
          label="Author"
          errorMessage="Please enter correct author"
          labelPlacement="inside"
          name="author"
          type="text"
          value={fields.author.value}
          onInput={fields.author.onChange}
        /> 

        <Input
          label="ISBN"
          errorMessage="Please enter correct ISBN"
          labelPlacement="inside"
          name="isbn"
          type="text"
          value={fields.isbn.value}
          onInput={fields.isbn.onChange}
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

        {!uploadCoverFromURL &&
          <Input
            label="Cover photo"
            errorMessage="Please upload correct cover photo"
            labelPlacement="inside"
            name="file"
            type="file"
          />
        }

        {uploadCoverFromURL &&
          <Input
            label="Cover photo URL"
            errorMessage="Please enter correct cover photo URL"
            labelPlacement="inside"
            name="imageUrl"
            type="text"
            value={fields.imageUrl.value}
            onInput={fields.imageUrl.onChange}
          />
        }

        <Checkbox
          isSelected={uploadCoverFromURL}
          onChange={e => setUploadCoverFromURL(e.currentTarget.checked)}>
          Upload cover via image URL</Checkbox>

        <Checkbox
          name="scored"
          onChange={e => setIsScored(e.currentTarget.checked)}
          value="true">
          Add a score</Checkbox>

        {isScored &&
          <Input
            isRequired
            label="Score"
            errorMessage="Please select correct score between 0 and 100"
            labelPlacement="inside"
            name="score"
            type="number"
            min="0"
            max="100"
          />
        }

        <Button type="submit" color="primary">
          Add
        </Button>
      </Form>

      <FormStatus
        formState={state}
        pending={pending}
        successProperty="id"
        sucessMessage="Book has been added successfully."
        />
    </div>
  );
}
