import { useState, FormEventHandler } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import AsyncSelect from 'react-select/async';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { IMaterialNetPrice } from '@/types';
import Select from 'react-select';

export default function Edit({ p_plants, p_material }) {
  const [showModal, setShowModal] = useState(false);
  const [altUom, setAltUom] = useState([]);

  const { data, setData, patch, processing, reset, errors } = useForm<IMaterialNetPrice>({
    id: p_material.id,
    vendor: p_material.vendor,
    vendorChoice: [{ value: p_material.vendor, label: `${p_material.vendor} - ${p_material.vendors?.name_1}` }],
    plant: p_material.plant,
    plantChoice: [{ value: p_material.plant, label: `${p_material.plant} - ${p_material.plants?.name1}` }],
    mat_code: p_material.mat_code,
    mat_codeChoice: [
      { value: p_material.mat_code, label: `${p_material.mat_code} - ${p_material.materials?.mat_desc}` },
    ],
    currency: p_material.currency,
    price: p_material.price,
    per_unit: p_material.per_unit,
    uom: p_material.uom,
    uomChoice: [{ label: p_material.uom, value: p_material.uom }],
    valid_from: p_material.valid_from,
    valid_to: p_material.valid_to,
    min_order_qty: p_material.min_order_qty,
    _method: 'patch',
  });

  const updateNetPrice: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('net_price.update', p_material.id), {
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

  const fetchVendor = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await window.axios.get(route('vendor.search', { search: inputValue }));
      return response.data.data.map((item) => ({
        value: item.supplier,
        label: `${item.supplier} - ${item.name_1}`,
      }));
    } catch (e) {
      console.log('Error fetching data:', e);
      return [];
    }
  };

  const fetchMaterial = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await window.axios.get(route('material.search', { search: inputValue }));

      return response.data.data.map((item) => ({
        value: item.mat_code,
        label: `${item.mat_code} - ${item.mat_desc}`,
      }));
    } catch (e) {
      console.log('Error fetching data:', e);
      return [];
    }
  };

  const fetchAltUom = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await window.axios.get(route('uom.search', { search: inputValue }));
      console.log(response.data.data);

      const m_altuom = response.data.data.map((item) => ({ value: item.alt_uom, label: item.alt_uom }));

      setAltUom(m_altuom);
    } catch (e) {
      console.log('Error fetching data:', e);
      // return [];
    }
  };

  return (
    <section className={`space-y-6`}>
      <svg
        onClick={() => setShowModal(true)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 cursor-pointer text-blue-500">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
      {/* <Button>Add</Button> */}

      <Modal show={showModal} onClose={closeModal} maxWidth="lg">
        <form onSubmit={updateNetPrice}>
          <div className="m-2">
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="vendor">
                Vendor
              </Label>
              <AsyncSelect
                className="m-2 w-full border-gray-500"
                cacheOptions
                defaultOptions
                loadOptions={fetchVendor}
                value={data.vendorChoice}
                defaultValue={data.vendor}
                onChange={(option: any) => setData({ ...data, vendor: option?.value, vendorChoice: option })}
                placeholder="Select Vendor"
                required={true}
              />
            </div>
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
                  fetchAltUom(option?.value);
                }}
                placeholder="Select Material"
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="uom">
                Unit of Measure
              </Label>
              <Select
                id="uom"
                className="m-2 w-full border-gray-500"
                value={data.uomChoice}
                options={altUom}
                onChange={(option: any) => setData({ ...data, uom: option?.value, uomChoice: option })}
                placeholder="Select UOM"
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
                defaultValue={data.price}
                onChange={(e) => setData('price', parseFloat(e.target.value))}
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="perUnit">
                Per Unit
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="number"
                id="perUnit"
                defaultValue={data.per_unit}
                onChange={(e) => setData('per_unit', parseFloat(e.target.value))}
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="minOrderQty">
                Min Order Qty
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="number"
                id="minOrderQty"
                defaultValue={data.min_order_qty}
                onChange={(e) => setData('min_order_qty', parseFloat(e.target.value))}
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
              <Button
                variant="outline"
                disabled={processing}
                className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-60">
                Update
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </section>
  );
}
