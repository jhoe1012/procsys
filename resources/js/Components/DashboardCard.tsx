import { ButtonHTMLAttributes } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui';

import { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

interface DashboardCardProps {
  href: string;
  className?: string;
  title: string;
  data: number;
  children?: ReactNode;
}

export default function DashboardCard({ href, className = '', title, data, children }: DashboardCardProps) {
  return (
    <Link href={href}>
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {children}
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{data}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
