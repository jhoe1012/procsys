import { GenericSelectProps } from '@/types';
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui';

const SelectField = <T extends Record<string, any>>({
  label,
  items,
  valueKey,
  displayKey,
  value,
  onValueChange,
  placeholder = 'Select an option',
  displayValue = false,
  required = false,
}: GenericSelectProps<T>) => {
  return (
    <div className="flex-auto">
      {label && <Label>{label}</Label>}
      <Select defaultValue={value} onValueChange={onValueChange} required={required}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items &&
            items.map((item) => (
              <SelectItem value={String(item[valueKey])} key={String(item[valueKey])}>
                {displayValue && String(item[valueKey])} {item[displayKey]}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
