import {Spinner} from "@heroui/react";

type FormStatusProps = {
  formState: { [key: string]: any },
  pending: boolean,
  // API doesn't always return success property, sometimes it may directly return data
  successProperty?: string,
  successMessage?: string
}

export default function FormStatus({
  formState,
  pending,
  successProperty = '',
  successMessage = ''
}: FormStatusProps) {
  return (
    <>
      {pending && <Spinner />}
      
      {successProperty in formState && formState[successProperty] && <p className="text-green-500">{successMessage}</p>}
      {formState.success && <p className="text-green-500">{formState.message}</p>}
      {!formState.success && <p className="text-red-500">{formState.message}</p>}
    </> 
  );
}
