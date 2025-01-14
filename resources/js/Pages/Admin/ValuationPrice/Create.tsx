import { useState, FormEventHandler } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import AsyncSelect from 'react-select/async';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { IMaterialValuation } from '@/types';
import Select from 'react-select';
import { fetchMaterial } from '@/lib/Material';

export default function Create({ p_plants }) {
  const [showModal, setShowModal] = useState(false);

  const { data, setData, post, processing, reset, errors } = useForm<IMaterialValuation>({
    mat_code: '',
    plant: '',
    currency: 'PHP',
    valuation_price: 0,
    per_unit: 1,
    valid_from: '',
    valid_to: '',
  });

  const createValuation: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('val_price.store'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      //   onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setShowModal(false);
    reset();
  };

  return (
    <section className={`space-y-6`}>
      <Button onClick={() => setShowModal(true)}>Add</Button>

      <Modal show={showModal} onClose={closeModal} maxWidth="lg">
        <form onSubmit={createValuation}>
          <div className="m-2">
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="plant">
                Plant
              </Label>
              <Select
                id="plant"
                className="m-2 w-full border-gray-500"
                value={data.plantChoice}
                options={p_plants}
                onChange={(option: any) => setData({ ...data, plant: option?.value, plantChoice: option })}
                placeholder="Select Plant"
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="material">
                Material
              </Label>
              <AsyncSelect
                className="m-2 w-full border-gray-500"
                cacheOptions
                defaultOptions
                loadOptions={fetchMaterial}
                value={data.mat_codeChoice}
                onChange={(option: any) => {
                  setData({ ...data, mat_code: option?.value, mat_codeChoice: option });
                }}
                placeholder="Select Material"
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="currency">
                Currency
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="text"
                id="currency"
                defaultValue={data.currency}
                onChange={(e) => setData('currency', e.target.value)}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="price">
                Price
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="number"
                id="price"
                defaultValue={data.valuation_price}
                onChange={(e) => setData('valuation_price', parseFloat(e.target.value))}
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="price">
                Per Unit
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="number"
                id="price"
                defaultValue={data.per_unit}
                onChange={(e) => setData('per_unit', parseFloat(e.target.value))}
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-1/5 text-sm content-center text-right" htmlFor="validFrom">
                Valid From
              </Label>
              <Input
                className="m-2 w-4/12 border-gray-300 h-10 "
                type="date"
                id="validFrom"
                defaultValue={data.valid_from}
                onChange={(e) => setData('valid_from', e.target.value)}
                required={true}
              />
            </div>

            <div className="flex ">
              <Label className="p-3 w-1/5 text-sm content-center text-right" htmlFor="validTo">
                Valid To
              </Label>
              <Input
                className="m-2 w-4/12 border-gray-300 h-10 "
                type="date"
                id="validTo"
                defaultValue={data.valid_to}
                onChange={(e) => setData('valid_to', e.target.value)}
                required={true}
              />
            </div>

            <div className="grid justify-items-center m-3">
              <Button variant="outline" disabled={processing} className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-60">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </section>
  );
}
