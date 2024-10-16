import { useState, KeyboardEvent } from 'react';
import Modal from '@/Components/Modal';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export default function PoReportFilter({
  queryParams,
  filterReport,
}: {
  queryParams: any;
  filterReport: (queryParam: any) => void;
}) {
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
  };

  const handleFilter = () => filterReport(queryParams);

  const clearFilter = () => {
    filterReport({});
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 ">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>

      <Modal show={showModal} onClose={closeModal} maxWidth="xl">
        <div className="m-2">
          <div className="flex ">
            <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="type">
              Purchasing Group
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.purch_grp}
              onBlur={(e) => searchFieldChanged('purch_grp', e.target.value)}
              onKeyDown={(e) => handleKeyPress('purch_grp', e)}
            />
          </div>
          <div className="flex ">
            <Label className="p-3 w-6/12 text-sm content-center text-right" htmlFor="type">
              Supplier
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10"
              type="text"
              defaultValue={queryParams.supplier_code}
              onBlur={(e) => searchFieldChanged('supplier_code', e.target.value)}
              onKeyDown={(e) => handleKeyPress('supplier_code', e)}
              placeholder="Code"
            />
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.supplier_name}
              onBlur={(e) => searchFieldChanged('supplier_name', e.target.value)}
              onKeyDown={(e) => handleKeyPress('supplier_name', e)}
              placeholder="Name"
            />
            </div>

          {/* <div className="flex ">
            <Label className="p-3 w-6/12 text-sm content-center text-right" htmlFor="type">
              PR Number
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10"
              type="text"
              defaultValue={queryParams.prnumber_from}
              onBlur={(e) => searchFieldChanged('prnumber_from', e.target.value)}
              onKeyDown={(e) => handleKeyPress('prnumber_from', e)}
              placeholder="From"
            />
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.prnumber_to}
              onBlur={(e) => searchFieldChanged('prnumber_to', e.target.value)}
              onKeyDown={(e) => handleKeyPress('prnumber_to', e)}
              placeholder="To"
            />
          </div> */}
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
              Material
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10"
              type="text"
              defaultValue={queryParams.matcode_from}
              onBlur={(e) => searchFieldChanged('matcode_from', e.target.value)}
              onKeyDown={(e) => handleKeyPress('matcode_from', e)}
              placeholder="From"
            />
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.matcode_to}
              onBlur={(e) => searchFieldChanged('matcode_to', e.target.value)}
              onKeyDown={(e) => handleKeyPress('matcode_to', e)}
              placeholder="To"
            />
          </div>
          <div className="flex ">
            <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="type">
              Short Text
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.short_text}
              onBlur={(e) => searchFieldChanged('short_text', e.target.value)}
              onKeyDown={(e) => handleKeyPress('short_text', e)}
            />
          </div>
          {/* <div className="flex ">
            <Label className="p-3 w-6/12 text-sm content-center text-right" htmlFor="type">
              Request Date
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10"
              type="date"
              defaultValue={queryParams.request_date_from}
              onBlur={(e) => searchFieldChanged('request_date_from', e.target.value)}
              onKeyDown={(e) => handleKeyPress('request_date_from', e)}
            />
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="date"
              defaultValue={queryParams.request_date_to}
              onBlur={(e) => searchFieldChanged('request_date_to', e.target.value)}
              onKeyDown={(e) => handleKeyPress('request_date_to', e)}
            />
          </div>
          <div className="flex ">
            <Label className="p-3 w-6/12 text-sm content-center text-right" htmlFor="type">
              Deliv. Date
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10"
              type="date"
              defaultValue={queryParams.deliv_date_from}
              onBlur={(e) => searchFieldChanged('deliv_date_from', e.target.value)}
              onKeyDown={(e) => handleKeyPress('deliv_date_from', e)}
            />
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="date"
              defaultValue={queryParams.deliv_date_to}
              onBlur={(e) => searchFieldChanged('deliv_date_to', e.target.value)}
              onKeyDown={(e) => handleKeyPress('deliv_date_to', e)}
            />
          </div> */}
          <div className="flex ">
            <Label className="p-3 w-6/12 text-sm content-center text-right" htmlFor="type">
              Release Date
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10"
              type="date"
              defaultValue={queryParams.release_date_from}
              onBlur={(e) => searchFieldChanged('release_date_from', e.target.value)}
              onKeyDown={(e) => handleKeyPress('release_date_from', e)}
            />
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="date"
              defaultValue={queryParams.release_date_to}
              onBlur={(e) => searchFieldChanged('release_date_to', e.target.value)}
              onKeyDown={(e) => handleKeyPress('release_date_to', e)}
            />
          </div>
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
          </div>
          <div className="flex ">
            <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="type">
              Plant
            </Label>
            <Input
              className="m-2 w-full border-gray-300 h-10 "
              type="text"
              defaultValue={queryParams.plant}
              onBlur={(e) => searchFieldChanged('plant', e.target.value)}
              onKeyDown={(e) => handleKeyPress('plant', e)}
            />
          </div>

          <div className="flex content-center justify-center gap-4 mb-5">
            <Button
              onClick={handleFilter}
              variant="outline"
              className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-52">
              Filter
            </Button>
            <Button onClick={clearFilter} variant="secondary" className=" w-52">
              Clear
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
