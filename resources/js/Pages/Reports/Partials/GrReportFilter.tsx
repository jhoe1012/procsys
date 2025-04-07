import { useState, KeyboardEvent } from 'react';
import Modal from '@/Components/Modal';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import Select from 'react-select';
import { usePage } from '@inertiajs/react';
import { Choice, PageProps } from '@/types';

export default function GrReportFilter({ queryParams, filterReport }: { queryParams: any; filterReport: (queryParam: any) => void }) {
  const [showModal, setShowModal] = useState(false);
  const plantsChoice: Choice[] = usePage<PageProps>().props.auth.user.plants.map((item) => ({ label: item.name1, value: item.plant }));
  const vendorsChoice: Choice[] = usePage<PageProps>().props.vendorsChoice!;

  const searchFieldChanged = (name: string, value: string) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
  };

  const handleKeyPress = (name: string, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, (e.target as HTMLInputElement).value);
    filterReport(queryParams);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={`space-y-6`}>
      <button
        onClick={() => setShowModal(true)}
        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm p-1 text-center"
        title="Filter">
        <AdjustmentsHorizontalIcon className="h-6 w-6" />
      </button>

      <Modal show={showModal} onClose={closeModal} maxWidth="xl">
        <div className="m-2">
          <div className="flex ">
            <Label className="p-3 w-6/12 text-sm content-center text-right" htmlFor="type">
              GR Number
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10"
              type="text"
              defaultValue={queryParams.grnumber_from}
              onBlur={(e) => searchFieldChanged('grnumber_from', e.target.value)}
              onKeyDown={(e) => handleKeyPress('grnumber_from', e)}
              placeholder="From"
            />
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.grnumber_to}
              onBlur={(e) => searchFieldChanged('grnumber_to', e.target.value)}
              onKeyDown={(e) => handleKeyPress('grnumber_to', e)}
              placeholder="To"
            />
          </div>
          <div className="flex ">
            <Label className="p-3 w-6/12 text-sm content-center text-right" htmlFor="type">
              PO Number
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10"
              type="text"
              defaultValue={queryParams.ponumber_from}
              onBlur={(e) => searchFieldChanged('ponumber_from', e.target.value)}
              onKeyDown={(e) => handleKeyPress('ponumber_from', e)}
              placeholder="From"
            />
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.ponumber_to}
              onBlur={(e) => searchFieldChanged('ponumber_to', e.target.value)}
              onKeyDown={(e) => handleKeyPress('ponumber_to', e)}
              placeholder="To"
            />
          </div>
          <div className="flex ">
            <Label className="p-3 w-6/12 text-sm content-center text-right" htmlFor="type">
              Control Number
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10"
              type="text"
              defaultValue={queryParams.control_from}
              onBlur={(e) => searchFieldChanged('control_from', e.target.value)}
              onKeyDown={(e) => handleKeyPress('control_from', e)}
              placeholder="From"
            />
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.control_to}
              onBlur={(e) => searchFieldChanged('control_to', e.target.value)}
              onKeyDown={(e) => handleKeyPress('control_to', e)}
              placeholder="To"
            />
          </div>
          <div className="flex ">
            <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="type">
              Supplier
            </Label>
            <Select
              className="m-2 w-full border-gray-500 h-10"
              options={vendorsChoice}
              defaultValue={vendorsChoice.find(({ value }) => value === queryParams.vendor)}
              onChange={(option: any) => searchFieldChanged('vendor', option?.value)}
              required={true}
              placeholder="Vendor"
            />
          </div>
          {/* 
          <div className="flex ">
            <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="type">
              Created By
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.created_name}
              onBlur={(e) => searchFieldChanged('created_name', e.target.value)}
              onKeyDown={(e) => handleKeyPress('created_name', e)}
            />
          </div> */}

          <div className="flex ">
            <Label className="p-3 w-6/12 text-sm content-center text-right" htmlFor="type">
              Entry Date
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10"
              type="date"
              defaultValue={queryParams.entry_date_from}
              onBlur={(e) => searchFieldChanged('entry_date_from', e.target.value)}
              onKeyDown={(e) => handleKeyPress('entry_date_from', e)}
              placeholder="From"
            />
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="date"
              defaultValue={queryParams.entry_date_to}
              onBlur={(e) => searchFieldChanged('entry_date_to', e.target.value)}
              onKeyDown={(e) => handleKeyPress('entry_date_to', e)}
              placeholder="To"
            />
          </div>

          <div className="flex ">
            <Label className="p-3 w-6/12 text-sm content-center text-right" htmlFor="type">
              Actual Recv. Date
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10"
              type="date"
              defaultValue={queryParams.actual_date_from}
              onBlur={(e) => searchFieldChanged('actual_date_from', e.target.value)}
              onKeyDown={(e) => handleKeyPress('actual_date_from', e)}
              placeholder="From"
            />
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="date"
              defaultValue={queryParams.actual_date_to}
              onBlur={(e) => searchFieldChanged('actual_date_to', e.target.value)}
              onKeyDown={(e) => handleKeyPress('actual_date_to', e)}
              placeholder="To"
            />
          </div>
          <div className="flex ">
            <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="type">
              Plant
            </Label>
            <Select
              className="m-2 w-full border-gray-500 h-10"
              options={plantsChoice}
              defaultValue={plantsChoice.find(({ value }) => value === queryParams.plant)}
              onChange={(option: any) => searchFieldChanged('plant', option?.value)}
              required={true}
              placeholder="Plant"
            />
          </div>
          <div className="flex ">
            <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="type">
              Delivery Note
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.delivery_note}
              onBlur={(e) => searchFieldChanged('delivery_note', e.target.value)}
              onKeyDown={(e) => handleKeyPress('delivery_note', e)}
            />
          </div>

          <div className="flex ">
            <Label className="p-3 w-6/12 text-sm content-center text-right" htmlFor="type">
              Material
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10"
              type="text"
              defaultValue={queryParams.mat_code_from}
              onBlur={(e) => searchFieldChanged('mat_code_from', e.target.value)}
              onKeyDown={(e) => handleKeyPress('mat_code_from', e)}
              placeholder="From"
            />
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.mat_code_to}
              onBlur={(e) => searchFieldChanged('mat_code_to', e.target.value)}
              onKeyDown={(e) => handleKeyPress('mat_code_to', e)}
              placeholder="To"
            />
          </div>

          <div className="flex ">
            <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="type">
              Material Description
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.short_text}
              onBlur={(e) => searchFieldChanged('short_text', e.target.value)}
              onKeyDown={(e) => handleKeyPress('short_text', e)}
            />
          </div>

          <div className="flex content-center justify-center gap-4 mb-5">
            <Button
              onClick={() => filterReport(queryParams)}
              variant="outline"
              className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-52">
              Filter
            </Button>
            <Button onClick={() => filterReport({})} variant="secondary" className=" w-52">
              Clear
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
