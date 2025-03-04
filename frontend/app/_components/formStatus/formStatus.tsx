import {Spinner} from "@heroui/react";

type FormStatusProps = {
  formState: { success: boolean, message: string, [key: string]: any },
  pending: boolean,
  // API doesn't always return success property, sometimes it may directly return data
  successProperty?: string,
  sucessMessage?: string
}

export default function FormStatus({
  formState,
  pending,
  successProperty = '',
  sucessMessage = ''
}: FormStatusProps) {
  return (
    <>
      {pending && <Spinner />}
      
      {successProperty in formState && formState[successProperty] && <p className="text-green-500">{sucessMessage}</p>}
      {formState.success && <p className="text-green-500">{formState.message}</p>}
      {!formState.success && <p className="text-red-500">{formState.message}</p>}
    </> 
  );
}
