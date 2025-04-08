import { useState, KeyboardEvent } from 'react';
import Modal from '@/Components/Modal';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components';
import { Filter } from 'lucide-react';
import { ScrollArea } from '@/Components/ui';
import Select from 'react-select';
import { usePage } from '@inertiajs/react';
import { Choice, PageProps } from '@/types';

export default function PoHistoryReportFilter({
  queryParams,
  filterReport,
}: {
  queryParams: any;
  filterReport: (queryParam: any) => void;
}) {
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
      <Button onClick={() => setShowModal(true)} variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
        <Filter className="size-5 m-1" strokeWidth={1} />
        Filter
      </Button>

      <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
        <ScrollArea>
          <div className="m-2">
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
                Control No.
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10"
                type="text"
                defaultValue={queryParams.controlno_from}
                onBlur={(e) => searchFieldChanged('controlno_from', e.target.value)}
                onKeyDown={(e) => handleKeyPress('controlno_from', e)}
                placeholder="From"
              />
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="text"
                defaultValue={queryParams.controlno_to}
                onBlur={(e) => searchFieldChanged('controlno_to', e.target.value)}
                onKeyDown={(e) => handleKeyPress('controlno_to', e)}
                placeholder="To"
              />
            </div>

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

            <div className="flex content-center justify-center gap-4 mb-5">
              <div className="flex content-center justify-center gap-4">
                <Checkbox checked={queryParams.open_po} onChange={(e) => searchFieldChanged('open_po', e.target.checked)} />
                <Label className="text-sm  w-full" htmlFor="type">
                  With Open PO
                </Label>
              </div>

              <div className="flex content-center justify-center gap-4">
                <Checkbox checked={queryParams.open_pr} onChange={(e) => searchFieldChanged('open_pr', e.target.checked)} />
                <Label className="text-sm  w-full" htmlFor="type">
                  With Open PR
                </Label>
              </div>
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
        </ScrollArea>
      </Modal>
    </section>
  );
}
