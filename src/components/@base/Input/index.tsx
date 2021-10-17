import { debounce } from "lodash";
import React from "react";

type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ onChange, ...rest }: InputProps) {
  const debounceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debounce(() => onChange!(e), 300)();

  return <input onChange={debounceChange} {...rest} />;
}

export default Input;
