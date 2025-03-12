'use client';

import { editUserLibrary } from "@/app/_actions/libraries/actions";
import useFormInput from "@/app/_hooks/useFormInput";
import { apiInitialState } from "@/app/_utils/reusable";
import { Button, Checkbox, Form, Input, Tooltip, addToast } from "@heroui/react";
import { startTransition, useActionState, useEffect } from "react";
import FormStatus from "../formStatus/formStatus";
import { BsClipboard2Fill } from "react-icons/bs";

type SettingsFormProps = {
  library: LibraryData,
  setLibrary?: (library: LibraryData) => void
};

export default function SettingsForm({
  library,
  setLibrary
}: SettingsFormProps) {
  const [state, formAction, pending] = useActionState(editUserLibrary, apiInitialState);

  const fields = {
    public: useFormInput<boolean>(false)
  };

  useEffect(() => {
    fields.public.setValue(library.public);
  }, [library]);

  useEffect(() => {
    if('id' in state && state.id && setLibrary) {
      setLibrary(state);
    }
  }, [state]);

  const copyPublicLibraryURLToClipboard = () => {
    (async () => {
      let isSuccess = false;

      if(navigator.clipboard) {
        try {
          const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/libraries/${library.id}`;
          await navigator.clipboard.writeText(url);
          isSuccess  = true
        } catch(err) {}
      }

      if(isSuccess) {
        addToast({
          title: 'Success',
          description: 'The URL was copied to the clipboard.',
          color: 'success'
        });
      } else {
        addToast({
          title: 'Error',
          description: 'Copying to clipboard failed. Please try again.',
          color: 'danger'
        });
      }
    })();
  };

  return (
    <div className="flex flex-col gap-4 pt-2">
      <h1 className="text-xl font-bold">
        User and library settings
      </h1>

      <Form
        action={formAction}
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(() => formAction(new FormData(e.currentTarget)));
        }}>

        <Input
          value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/libraries/${library.id}`}
          label="My public library url"
          endContent={
            <Tooltip
              content="Copy to clipboard"
              placement="top">
              <BsClipboard2Fill
                className="cursor-pointer"
                onClick={copyPublicLibraryURLToClipboard} />
            </Tooltip>
            }
        />

        <Checkbox
          isSelected={fields.public.value}
          onChange={e => fields.public.setValue(e.currentTarget.checked)}
          name="public"
          value="true">
            Is library public?
        </Checkbox>     

        <Button type="submit" color="primary">
          Edit
        </Button>
      </Form>

      <FormStatus
        formState={state}
        pending={pending}
        successProperty="id"
        successMessage="Info has been edited successfully."
      />
    </div>
  );
}