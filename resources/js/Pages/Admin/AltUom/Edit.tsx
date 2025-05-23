import AsyncSelect from 'react-select/async';
import { useState, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { IAlternativeUom } from '@/types';
import { Button, Input, Label } from '@/Components/ui';
import { Modal } from '@/Components';
import { fetchMaterial } from '@/lib/Material';
import { fetchUom } from '@/lib/Uom';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

export default function Edit({ altUom }: { altUom: IAlternativeUom }) {
  const [showModal, setShowModal] = useState(false);

  const { data, setData, patch, processing, reset, errors } = useForm<IAlternativeUom>({
    mat_code: altUom.mat_code,
    mat_codeChoice: altUom.material && {
      value: altUom.material.mat_code,
      label: `${altUom.material.mat_code} - ${altUom.material.mat_desc}`,
    },
    alt_uom: altUom.alt_uom,
    alt_uomChoice: altUom.altUomText && {
      value: altUom.altUomText.uom,
      label: `${altUom.altUomText.uom} - ${altUom.altUomText.uom_text}`,
    },
    counter: altUom.counter,
    denominator: altUom.denominator,
    ean_num: altUom.ean_num,
    ean_upc: altUom.ean_upc,
    ean_category: altUom.ean_category,
    unit_of_weight: altUom.unit_of_weight,
    unit_of_weightChoice: altUom.unitOfWeightText && {
      value: altUom.unitOfWeightText.uom,
      label: `${altUom.unitOfWeightText.uom} - ${altUom.unitOfWeightText.uom_text}`,
    },
    _method: 'patch',
  });

  const creareAltUom: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('altuom.update', altUom.id), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
    });
  };

  const closeModal = () => {
    setShowModal(false);

    reset();
  };

  return (
    <section className={`space-y-6`}>
      <PencilSquareIcon onClick={() => setShowModal(true)} className="size-6 cursor-pointer text-blue-500" />

      <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
        <form onSubmit={creareAltUom}>
          <div className="m-2 p-5">
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="user">
                Material
              </Label>
              <AsyncSelect
                id="material"
                className="m-2 w-full border-gray-500"
                cacheOptions
                defaultOptions
                loadOptions={fetchMaterial}
                value={data.mat_codeChoice}
                onChange={(option: any) => {
                  setData({ ...data, mat_code: option.value, mat_codeChoice: option });
                }}
                placeholder="Select Material"
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="user">
                Unit of Measure
              </Label>
              <AsyncSelect
                id="material"
                className="m-2 w-full border-gray-500"
                cacheOptions
                defaultOptions
                loadOptions={fetchUom}
                value={data.alt_uomChoice}
                onChange={(option: any) => {
                  setData({ ...data, alt_uom: option.value, alt_uomChoice: option });
                }}
                placeholder="Select UOM"
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="counter">
                Counter
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="counter"
                defaultValue={data.counter}
                onChange={(e) => setData('counter', parseInt(e.target.value))}
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="denominator">
                Denominator
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="denominator"
                defaultValue={data.denominator}
                onChange={(e) => setData('denominator', parseInt(e.target.value))}
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="ean_num">
                EAN Number
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="ean_num"
                defaultValue={data.ean_num}
                onChange={(e) => setData('ean_num', e.target.value)}
                maxLength={20}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="ean_upc">
                EAN UPC
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="ean_upc"
                defaultValue={data.ean_upc}
                onChange={(e) => setData('ean_upc', e.target.value)}
                maxLength={10}
              />
            </div>

            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="ean_category">
                EAN Category
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="ean_category"
                defaultValue={data.ean_category}
                onChange={(e) => setData('ean_category', e.target.value)}
                maxLength={10}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="user">
                Unit of Weight
              </Label>
              <AsyncSelect
                id="material"
                className="m-2 w-full border-gray-500 z-50"
                cacheOptions
                defaultOptions
                loadOptions={fetchUom}
                value={data.unit_of_weightChoice}
                onChange={(option: any) => {
                  setData({ ...data, unit_of_weight: option.value, unit_of_weightChoice: option });
                }}
                placeholder="Select UOM"
              />
            </div>

            <div className="grid justify-items-center my-5">
              <Button variant="outline" disabled={processing} className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-60">
                Update
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </section>
  );
}
