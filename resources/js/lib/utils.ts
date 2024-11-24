import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CSSObjectWithLabel } from 'react-select';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (n: number) =>
  Number(n).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const dateToday = new Date().toLocaleDateString();

// Custom style for react select
export const reactSelectStyles = {
  control: (provided: CSSObjectWithLabel ) => ({
    ...provided,
    minHeight: '1.75rem',
    height: '1.75rem',
    fontSize: '0.875rem',
  }),

  valueContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: '1.75rem',
    padding: '0 6px',
    textTransform: 'capitalize',
  }),

  input: (provided: CSSObjectWithLabel ) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided: CSSObjectWithLabel ) => ({
    ...provided,
    height: '1.75rem',
  }),
};

// custom style for Data Sheet Grid
export const customDataSheetStyle = {
  '--dsg-header-text-color': 'rgb(10, 10, 10)',
  '--dsg-cell-disabled-background-color': 'rgb(245, 245, 245)',
  '--dsg-border-color': '#bfbdbd',
};
