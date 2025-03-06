import {useState} from "react";

export default function useFormInput() {
  const [value, setValue] = useState('');
  
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    setValue
  };
}
