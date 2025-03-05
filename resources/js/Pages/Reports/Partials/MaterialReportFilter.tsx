import { useState, KeyboardEvent } from 'react';
import Modal from '@/Components/Modal';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

export default function MaterialReportFilter({ queryParams, filterReport }: { queryParams: any; filterReport: (queryParam: any) => void }) {
  const [showModal, setShowModal] = useState(false);

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

      <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
        <div className="m-2">
          <div className="flex ">
            <Label className="p-3 w-4/12 text-sm content-center text-right" htmlFor="type">
              Material Description
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.mat_desc}
              onBlur={(e) => searchFieldChanged('mat_desc', e.target.value)}
              onKeyDown={(e) => handleKeyPress('mat_desc', e)}
            />
          </div>

          <div className="flex ">
            <Label className="p-3 w-8/12 text-sm content-center text-right" htmlFor="type">
              Material Code
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
