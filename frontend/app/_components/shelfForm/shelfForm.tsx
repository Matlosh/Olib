'use client';

import {addShelf, editShelf} from "@/app/_actions/shelves/actions";
import {apiInitialState} from "@/app/_utils/reusable";
import {Button, Form, Input} from "@heroui/react";
import {startTransition, useActionState, useEffect, useRef} from "react";
import FormStatus from "../formStatus/formStatus";

export default function ShelfForm({ editMode = false }: { editMode?: boolean }) {
  const [state, formAction, pending] = useActionState(editMode ? editShelf : addShelf, apiInitialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if('id' in state && state.id && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

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
        className="flex flex-col gap-2"
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
