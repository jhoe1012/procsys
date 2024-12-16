import { REACT_SELECT_STYLE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Choice } from '@/types';

import Select, { ActionMeta, SingleValue } from 'react-select';
import { Label } from './ui';

interface ReactSelectFieldProps {
  label?: string;
  value: Choice | null;
  options: Choice[];
  required?: boolean;
  onChange: (newValue: SingleValue<Choice>, actionMeta: ActionMeta<Choice>) => void;
  className?: string | undefined;
}

const ReactSelectField: React.FC<ReactSelectFieldProps> = ({ label, value, options, required = false, onChange, className }) => {
  return (
    <div className={cn('flex-none', className)}>
      <Label>{label}</Label>
      <Select required={required} value={value} options={options} onChange={onChange} styles={REACT_SELECT_STYLE} />
    </div>
  );
};

export default ReactSelectField;
