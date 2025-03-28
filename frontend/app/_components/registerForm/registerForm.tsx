'use client';

import {Button, Card, Form, Input, Spinner} from "@heroui/react"
import {startTransition, useActionState, useEffect} from "react";
import {apiInitialState} from "@/app/_utils/reusable";
import {useRouter} from "next/navigation";
import {registerUser} from "@/app/_actions/user/actions";
import FormStatus from "../formStatus/formStatus";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerUser, apiInitialState);  
  const router = useRouter();

  useEffect(() => {
    if(state.success) {
      router.push("/"); 
    }
  }, [state]);

  return (
    <Card className="p-4 w-[calc(100%-2rem)] md:w-full max-w-[500px] flex flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold mb-4">Create an account</h1>

      <Form
        className="w-full flex flex-col items-center justify-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(() => formAction(new FormData(e.currentTarget)));
        }}>
        <div className="w-full flex flex-col items-start gap-4">
          <Input
            isRequired
            errorMessage="Please enter correct nick"
            label="Nick"
            labelPlacement="inside"
            type="text"
            name="nick"
          />
          
          <Input
            isRequired
            errorMessage="Please enter correct login"
            label="Login"
            labelPlacement="inside"
            type="text"
            name="login"
          />

          <Input
            isRequired
            errorMessage="Please enter correct email address"
            label="Email"
            labelPlacement="inside"
            type="email"
            name="email"
          />

          <Input
            isRequired
            errorMessage="Password cannot be empty"
            label="Password"
            labelPlacement="inside"
            type="password"
            name="password"
          />

          <a href="/" className="hover:text-blue-400 text-blue-500 underline duration-150">
            Want to login instead? 
          </a>
        </div>
        
        <Button
          type="submit"
          color="primary"
          disabled={pending}>
          Create 
        </Button>
      </Form>

      <FormStatus formState={state} pending={pending} />
    </Card>
  );
}
