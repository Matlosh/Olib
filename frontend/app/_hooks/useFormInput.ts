import {useState} from "react";

export default function useFormInput<T = string>(defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  
  return {
    value,
    setValue,
    reset: () => setValue(defaultValue)
  };
}
