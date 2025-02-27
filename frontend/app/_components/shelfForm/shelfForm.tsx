'use client';

import {addShelf, editShelf} from "@/app/_actions/shelves/actions";
import {apiInitialState} from "@/app/_utils/reusable";
import {Button, Form, Input} from "@heroui/react";
import {startTransition, useActionState} from "react";
import FormStatus from "../formStatus/formStatus";

export default function ShelfForm({ editMode = false }: { editMode?: boolean }) {
  const [state, formAction, pending] = useActionState(editMode ? editShelf : addShelf, apiInitialState);

  return (
    <div className="flex flex-col gap-2">
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
        }}>
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

      <FormStatus formState={state} pending={pending} />
    </div>
  );
}
