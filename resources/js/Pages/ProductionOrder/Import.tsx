import { Modal } from '@/Components';
import { Button, Input, Toaster, useToast } from '@/Components/ui';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Choice, PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import { FormEventHandler, useEffect, useState } from 'react';
import Select from 'react-select';

export default function Import({ auth, batches, stores, errorResult, message }: PageProps<{ batches: Choice[]; stores: Choice[] }>) {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const { data, setData, post, errors, reset, processing } = useForm({
    batch_from: '',
    batch_to: '',
    stcd: '',
    del_date_from: '',
    del_date_to: '',
  });

  const importFromCbb: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('store-orders.import'), {
      preserveScroll: true,
      // onSuccess: () => reset(),
      // onFinish: () => ,
    });
  };

  useEffect(() => {
    setShowModal(errorResult && errorResult.length > 0);
  }, [errorResult]);

  useEffect(() => {
    if (errors.hasOwnProperty('error')) {
      toast({
        variant: 'destructive',
        description: errors.error,
      });
    }

    if (message) {
      toast({
        description: message,
      });
    }
  }, [errors, message]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Import Orders from CBB</h2>
        </div>
      }>
      <Head title="Import Orders" />
      <Toaster />
      <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="3xl">
        <div className="border border-gray-300 max-h-[90vh] p-1 overflow-hidden flex flex-col">
          <table className="w-full border-collapse table-fixed">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className=" p-2">Delivery Date</th>
                <th className=" p-2">Ref Number</th>
                <th className=" p-2">Store</th>
                <th className=" p-2">Material</th>
                <th className=" p-2">UOM</th>
                <th className=" p-2">Remarks</th>
              </tr>
            </thead>
          </table>
          <div className="overflow-y-auto min-h-[50vh]">
            <table className="w-full border-collapse table-fixed">
              <tbody>
                {errorResult &&
                  errorResult.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2 text-center">{item.delivery_date}</td>
                      <td className="border border-gray-300 p-2">
                        {item.order_type} - {item.order_number}
                      </td>
                      <td className="border border-gray-300 p-2">{item.stor}</td>
                      <td className="border border-gray-300 p-2">{item.old_mat_code}</td>
                      <td className="border border-gray-300 p-2">{item.uom}</td>
                      <td className="border border-gray-300 p-2">{item.remarks}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      <div className="py-2 ">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 text-black overflow-hidden shadow-sm sm:rounded-lg ">
            <div className="p-3 min-h-screen flex justify-center">
              <form onSubmit={importFromCbb}>
                {/* Dates */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Label className="w-44 text-sm text-right" htmlFor="del_date_from">
                      Delivery Date
                    </Label>
                    <Input
                      className="h-10 w-full border-gray-300"
                      type="date"
                      id="del_date_from"
                      onChange={(e) => setData('del_date_from', e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Label className="w-16 text-sm text-right" htmlFor="del_date_to">
                      To
                    </Label>
                    <Input
                      className="h-10 w-full border-gray-300"
                      type="date"
                      id="del_date_to"
                      onChange={(e) => setData('del_date_to', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Batches */}
                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div className="flex items-center gap-3">
                    <Label className="w-40 text-sm text-right" htmlFor="batch_from">
                      Batch
                    </Label>
                    <Select
                      id="batch_from"
                      className="w-full border-gray-500"
                      options={batches}
                      onChange={(option) => setData('batch_from', option?.value)}
                      placeholder="Select Batch"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Label className="w-16 text-sm text-right" htmlFor="batch_to">
                      To
                    </Label>
                    <Select
                      id="batch_to"
                      className="w-full border-gray-500"
                      options={batches}
                      onChange={(option) => setData('batch_to', option?.value)}
                      placeholder="Select Batch"
                    />
                  </div>
                </div>

                {/* Store */}
                <div className="grid grid-cols-1 gap-6 mt-4  ">
                  <div className="flex items-center gap-3">
                    <Label className="w-32 text-sm text-right" htmlFor="store">
                      Store
                    </Label>
                    <Select
                      id="store"
                      className="w-full border-gray-500"
                      options={stores}
                      onChange={(option) => setData('stcd', option?.value)}
                      placeholder="Select Store"
                    />
                  </div>
                  <div />
                </div>

                {/* Action */}
                <div className="grid justify-items-center mt-6">
                  <Button variant="outline" disabled={processing} className="w-60 bg-[#f8c110] hover:border-gray-500 hover:bg-[#f8c110]">
                    Download
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
