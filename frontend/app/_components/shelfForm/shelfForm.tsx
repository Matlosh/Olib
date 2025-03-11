'use client';

import {addShelf, editShelf} from "@/app/_actions/shelves/actions";
import {apiInitialState} from "@/app/_utils/reusable";
import {Button, Form, Input} from "@heroui/react";
import {startTransition, useActionState, useEffect, useRef} from "react";
import FormStatus from "../formStatus/formStatus";
import useFormInput from "@/app/_hooks/useFormInput";

type ShelfFormProps = {
  editMode?: boolean,
  shelf?: ShelfData,
  setShelf?: (shelf: ShelfData) => void
};

export default function ShelfForm({
  editMode = false,
  shelf,
  setShelf
}: ShelfFormProps) {
  const [state, formAction, pending] = useActionState(editMode ? editShelf : addShelf, apiInitialState);
  const formRef = useRef<HTMLFormElement>(null);

  const fields = {
    name: useFormInput('')
  };

  useEffect(() => {
    if(!editMode && 'id' in state && state.id && formRef.current) {
      formRef.current.reset();
    }

    if(setShelf && 'id' in state && state.id && formRef.current) {
      setShelf(state); 
    }
  }, [state]);

  useEffect(() => {
    if(editMode && shelf) {
      fields.name.setValue(shelf.name);
    }
  }, [editMode, shelf]);

  return (
    <div className="flex flex-col gap-4 pt-2">
      <h1 className="text-xl font-bold">
        {editMode ?
          'Edit an existing shelf'
          :
          'Add a new shelf'
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
        {editMode && shelf && shelf.id &&
          <input
            type="hidden"
            name="id"
            value={shelf.id.toString()} /> 
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

        <Button type="submit" color="primary">
          {editMode ? "Edit" : "Add" }
        </Button>
      </Form>

      <FormStatus
        formState={state}
        pending={pending}
        successProperty="id"
        successMessage={
          editMode ?
            "Shelf has been edited successfully."
            :
            "Shelf has been added successfully."
        }
        />
    </div>
  );
}
