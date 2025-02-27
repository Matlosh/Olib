'use client';

import {Button, Card, Form, Input, Spinner} from "@heroui/react"
import {useActionState, useEffect} from "react";
import {apiInitialState} from "@/app/_utils/reusable";
import {loginUser} from "@/app/_actions/user/actions";
import {useRouter} from "next/navigation";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginUser, apiInitialState);
  const router = useRouter();

  useEffect(() => {
    if(state.success) {
      router.push("/dashboard");
    }
  }, [state]);

  return (
    <Card className="p-4 w-full max-w-[500px] flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <Form
        className="w-full flex flex-col items-center justify-center gap-4"
        action={formAction}>
        <div className="w-full flex flex-col items-start gap-4">
          <Input
            isRequired
            errorMessage="Please enter correct login"
            label="Login"
            labelPlacement="inside"
            name="login"
            type="text"
          />

          <Input
            isRequired
            errorMessage="Password cannot be empty"
            label="Password"
            labelPlacement="inside"
            name="password"
            type="password"
          />

          <a href="/register" className="hover:text-blue-400 text-blue-500 underline duration-150">
            Want to create an account?
          </a>
        </div>
        
        <Button type="submit" color="primary">
          Login
        </Button>

        {pending && <Spinner />}
        
        {state.success && state.message.length > 0 && <p className="text-green-500">{state.message}</p>}
        {!state.success && state.message.length > 0 && <p className="text-red-500">{state.message}</p>}
      </Form>
    </Card>
  );
}
