import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        Draft: 'bg-blue-100 text-blue-800 text-xs font-medium dark:bg-blue-900 dark:text-blue-300',
        Rework: 'bg-blue-100 text-blue-800 text-xs font-medium dark:bg-blue-900 dark:text-blue-300',
        Cancelled: 'bg-red-100 text-red-800 text-xs font-medium dark:bg-red-900 dark:text-red-300',
        Rejected: 'bg-red-100 text-red-800 text-xs font-medium dark:bg-red-900 dark:text-red-300',
        Approved: 'bg-green-100 text-green-800 text-xs font-medium dark:bg-green-900 dark:text-green-300',
        Approval: 'bg-yellow-100 text-yellow-800 text-xs font-medium dark:bg-yellow-900 dark:text-yellow-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
