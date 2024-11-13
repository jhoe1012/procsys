import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (n: number) =>
  Number(n).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const reactSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '1.75rem',
    height: '1.75rem',
    fontSize: '0.875rem',
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '1.75rem',
    padding: '0 6px',
    textTransform: 'capitalize',
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
    
  }),
  indicatorSeparator: (state) => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '1.75rem',
  }),
};
