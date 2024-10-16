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
