'use client';

import {Button, Card, Form, Input} from "@heroui/react"

export default function Home() {
  return (
    <Card className="p-4 w-full max-w-[500px] flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <Form className="w-full flex flex-col items-center justify-center gap-4">
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
          name="login"
          type="password"
        />

        <Button type="submit" color="primary">
          Login
        </Button>
      </Form>
    </Card>
  );
}
