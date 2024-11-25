import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (n: number) =>
  Number(n).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatShortDate = (date: string) => {
  return moment(date).format('ll')
};

export const formatLongDate = (date: string) => {
  return moment(date).format('lll')
};
