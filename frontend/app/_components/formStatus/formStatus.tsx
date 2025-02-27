import {Spinner} from "@heroui/react";

export default function FormStatus({
  formState,
  pending
}: {
  formState: { success: boolean, message: string },
  pending: boolean
}) {
  return (
    <>
      {pending && <Spinner />}
      
      {formState.success && <p className="text-green-500">{formState.message}</p>}
      {!formState.success && <p className="text-red-500">{formState.message}</p>}
    </> 
  );
}
