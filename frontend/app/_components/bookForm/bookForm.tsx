'use client';

import {addShelf, editShelf} from "@/app/_actions/shelves/actions";
import {apiInitialState} from "@/app/_utils/reusable";
import {Button, Checkbox, Form, Input, Spinner} from "@heroui/react";
import {startTransition, useActionState, useEffect, useRef, useState} from "react";
import FormStatus from "../formStatus/formStatus";

export default function BookForm({ editMode = false }: { editMode?: boolean }) {
  const [state, formAction, pending] = useActionState(editMode ? editShelf : addShelf, apiInitialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [isScored, setIsScored] = useState(false);
  const [uploadCoverFromURL, setUploadCoverFromURL] = useState(false);
  const [ISBN, setISBN] = useState('');

  useEffect(() => {
    if('id' in state && state.id && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

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
        /> 
        
        <Input
          isRequired
          label="Author"
          errorMessage="Please enter correct author"
          labelPlacement="inside"
          name="author"
          type="text"
        /> 

        <Input
          label="ISBN"
          errorMessage="Please enter correct ISBN"
          labelPlacement="inside"
          name="isbn"
          type="text"
          onInput={e => setISBN(e.currentTarget.value)}
        />

        {ISBN.trim().length > 0 &&
          <div className="flex flex-row gap-4">
            <Button type="button" color="primary">
              Fill book details via ISBN 
            </Button>

            <Spinner />
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
            name="imageurl"
            type="text"
          />
        }

        <Checkbox
          onChange={e => setUploadCoverFromURL(e.currentTarget.checked)}>
          Upload cover via image URL</Checkbox>

        <Checkbox
          name="scored"
          onChange={e => setIsScored(e.currentTarget.checked)}>
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
        sucessMessage="Shelf has been added successfully."
        />
    </div>
  );
}
