import { FormFieldProps } from '@/types';
import { Input, Label } from './ui';
import { cn } from '@/lib/utils';

export default function InputField({
  label,
  id,
  type = 'text',
  value,
  defaultValue,
  required = false,
  disabled = false,
  onChange,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('flex-auto w-28', className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} value={value} defaultValue={defaultValue} required={required} disabled={disabled} onChange={onChange} />
    </div>
  );
}
