import {Spinner} from "@heroui/react";

export type StatusMessage = {
  message: string,
  status: 'success' | 'error'
};

type FormStatusProps = {
  formState: { [key: string]: any },
  pending: boolean,
  // API doesn't always return success property, sometimes it may directly return data
  successProperty?: string,
  successMessage?: string,
  // Custom message takes priority over the default (state) message
  customMessage?: StatusMessage
}

export default function FormStatus({
  formState,
  pending,
  successProperty = '',
  successMessage = '',
  customMessage
}: FormStatusProps) {
  return (
    <>
      {pending && <Spinner />}
      
      {!customMessage || (customMessage && customMessage.message.length < 1)
        ?
          <>
            {successProperty in formState && formState[successProperty] && <p className="text-green-500">{successMessage}</p>}
            {formState.success && <p className="text-green-500">{formState.message}</p>}
            {!formState.success && <p className="text-red-500">{formState.message}</p>}
          </>
        :
          <>
            <p className={customMessage.status === 'success' ? 'text-green-500' : 'text-red-500'}>{customMessage.message}</p>
          </>
      }
    </> 
  );
}
