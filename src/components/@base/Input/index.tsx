type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ ...rest }: InputProps) {
  return <input {...rest} />;
}

export default Input;
