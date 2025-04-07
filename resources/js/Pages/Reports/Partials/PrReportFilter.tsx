import { useState, KeyboardEvent } from 'react';
import Modal from '@/Components/Modal';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { Checkbox } from '@/Components';
import { usePage } from '@inertiajs/react';
import Select from 'react-select';
import { PageProps } from '@/types';

export default function PrReportFilter({ queryParams, filterReport }: { queryParams: any; filterReport: (queryParam: any) => void }) {
  const [showModal, setShowModal] = useState(false);
  const plants = usePage<PageProps>().props.auth.user.plants.map((item) => ({ label: item.name1, value: item.plant }));

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
          <div className="flex items-center space-x-4">
            <Label className="p-3 w-6/12 text-sm content-center text-right" htmlFor="type">
              Plant
            </Label>
            <Select
              className="m-2 w-full border-gray-500 h-10"
              options={plants}
              defaultValue={plants.filter((item) => item.value === queryParams.plant)}
              onChange={(option: any) => searchFieldChanged('plant', option?.value)}
              required={true}
              placeholder="Plant"
            />
            <Checkbox checked={queryParams.open_pr} onChange={(e) => searchFieldChanged('open_pr', e.target.checked)} />
            <Label className="text-sm  w-full" htmlFor="type">
              With Open PR
            </Label>
          </div>
          <div className="flex ">
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
          </div>
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
