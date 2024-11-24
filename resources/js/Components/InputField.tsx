import { FormFieldProps } from '@/types';
  import { Input, Label } from './ui';

export default function InputField({
  label,
  id,
  type = 'text',
  value,
  defaultValue,
  required = false,
  disabled = false,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex-auto">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        value={value}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}
