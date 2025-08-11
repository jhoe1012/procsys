import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui';
import { FileCheck, FileStack, FileUser, FileX2 } from 'lucide-react';
import { DashboardCard } from '@/Components';
import { canAny } from '@/lib/helper';
import { PermissionsEnum } from '@/lib/constants';

interface DashboardProps {
  approval: number;
  approved: number;
  cancelled: number;
  total: number;
}

export default function Index({ auth, prHeader, poHeader }: PageProps<{ prHeader: DashboardProps; poHeader: DashboardProps }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
      <Head title="Dashboard" />

      <div className="py-5">
        <div className="max-w-full mx-auto sm:px-6 lg:px-8">
          {canAny(auth.user, [PermissionsEnum.CreatePR, PermissionsEnum.ApproverPR]) && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">Purchase Request</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-5">
                  <DashboardCard href={route('pr.index')} title="Total Purchase Request" data={prHeader.total} className="bg-blue-400 ">
                    <FileStack className="h-5 w-5 text-foreground" />
                  </DashboardCard>
                  <DashboardCard
                    href={route('pr.index', { status: 'approved' })}
                    title="Approved Purchase Request"
                    data={prHeader.approved}
                    className="bg-green-400">
                    <FileCheck className="h-5 w-5 text-foreground" />
                  </DashboardCard>
                  <DashboardCard
                    href={route('pr.index', { status: 'approval' })}
                    title="For Approval Purchase Request"
                    data={prHeader.approval}
                    className="bg-yellow-400">
                    <FileUser className="h-5 w-5 text-foreground" />
                  </DashboardCard>
                  <DashboardCard
                    href={route('pr.index', { status: 'cancelled' })}
                    title="Cancelled Purchase Request"
                    data={prHeader.cancelled}
                    className="bg-red-400">
                    <FileX2 className="h-5 w-5 text-foreground" />
                  </DashboardCard>
                </div>
              </CardContent>
            </Card>
          )}
          {canAny(auth.user, [PermissionsEnum.CreatePO, PermissionsEnum.ApproverPO]) && (
            <Card className="mt-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">Purchase Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-5">
                  <DashboardCard href={route('po.index')} title="Total Purchase Order" data={poHeader.total} className="bg-blue-400">
                    <FileStack className="h-5 w-5 text-foreground" />
                  </DashboardCard>
                  <DashboardCard
                    href={route('po.index', { status: 'approved' })}
                    title="Approved Purchase Order"
                    data={poHeader.approved}
                    className="bg-green-400">
                    <FileCheck className="h-5 w-5 text-foreground" />
                  </DashboardCard>
                  <DashboardCard
                    href={route('po.index', { status: 'approval' })}
                    title="For Approval Purchase Order"
                    data={poHeader.approval}
                    className="bg-yellow-400">
                    <FileUser className="h-5 w-5 text-foreground" />
                  </DashboardCard>
                  <DashboardCard
                    href={route('po.index', { status: 'cancelled' })}
                    title="Cancelled Purchase Order"
                    data={poHeader.cancelled}
                    className="bg-red-400">
                    <FileX2 className="h-5 w-5 text-foreground" />
                  </DashboardCard>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
