import { InputHTMLAttributes } from 'react';

export default function Checkbox({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} type="checkbox" className={'rounded border-blue-500 text-indigo-600 shadow-sm focus:ring-indigo-500  ' + className} />
  );
}
