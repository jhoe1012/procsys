import { useState, FormEventHandler } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { IVendor } from '@/types';

export default function Edit({ p_vendor }) {
  const [showModal, setShowModal] = useState(false);
  
  const { data, setData, post, processing, reset, errors } = useForm<IVendor>({
    supplier: p_vendor.supplier,
    account_group: p_vendor.account_group,
    tax_number: p_vendor.tax_number,
    tax_number_2: p_vendor.tax_number_2,
    name_1: p_vendor.name_1,
    search_term: p_vendor.search_term,
    city: p_vendor.city,
    country: p_vendor.country,
    district: p_vendor.district,
    postal_code: p_vendor.postal_code,
    street: p_vendor.street,
    address: p_vendor.address,
    city_2: p_vendor.city_2,
    telephone_1: p_vendor.telephone_1,
    telephone_2: p_vendor.telephone_2,
    vat_reg_no: p_vendor.vat_reg_no,
  });
  
  const updateVendor: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('vendor.store'), {
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

      <Modal show={showModal} onClose={closeModal} maxWidth="3xl">
        <form onSubmit={updateVendor}>
          <div className="m-2">
            <div className="flex px-2">
              <div className="p-1 w-3/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="supplier">
                  Supplier
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="supplier"
                  defaultValue={data.supplier}
                  onChange={(e) => setData('supplier', e.target.value)}
                  maxLength={100}
                  required={true}
                />
              </div>
              <div className="p-1 w-3/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="account_group">
                  Account Group
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="account_group"
                  defaultValue={data.account_group}
                  onChange={(e) => setData('account_group', e.target.value)}
                  maxLength={100}
                />
              </div>
              <div className="p-1 w-3/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="tax_number">
                  Tax Number
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="tax_number"
                  defaultValue={data.tax_number}
                  onChange={(e) => setData('tax_number', e.target.value)}
                  maxLength={100}
                  required={true}
                />
              </div>
              <div className="p-1 w-3/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="tax_number_2">
                  Tax Number 2
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="tax_number_2"
                  defaultValue={data.tax_number_2}
                  onChange={(e) => setData('tax_number_2', e.target.value)}
                  maxLength={100}
                />
              </div>
            </div>

            <div className="flex px-2">
              <div className="p-1 w-6/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="name_1">
                  Name
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="name_1"
                  defaultValue={data.name_1}
                  onChange={(e) => setData('name_1', e.target.value)}
                  maxLength={100}
                  required={true}
                />
              </div>
              <div className="p-1 w-6/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="street">
                  Street
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="street"
                  defaultValue={data.street}
                  onChange={(e) => setData('street', e.target.value)}
                  maxLength={100}
                  required={true}
                />
              </div>
            </div>

            <div className="flex px-2">
              <div className="p-1 w-6/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="city">
                  City
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="city"
                  defaultValue={data.city}
                  onChange={(e) => setData('city', e.target.value)}
                  maxLength={100}
                  required={true}
                />
              </div>
              <div className="p-1 w-3/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="country">
                  Country
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="country"
                  defaultValue={data.country}
                  onChange={(e) => setData('country', e.target.value)}
                  maxLength={100}
                  required={true}
                />
              </div>
              <div className="p-1 w-3/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="district">
                  District
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="district"
                  defaultValue={data.district}
                  onChange={(e) => setData('district', e.target.value)}
                  maxLength={100}
                />
              </div>
            </div>

            <div className="flex px-2">
              <div className="p-1 w-3/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="postal_code">
                  Postal Code
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="postal_code"
                  defaultValue={data.postal_code}
                  onChange={(e) => setData('postal_code', parseFloat(e.target.value))}
                  maxLength={4}
                  required={true}
                />
              </div>
              <div className="p-1 w-3/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="telephone_1">
                  Telephone
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="telephone_1"
                  defaultValue={data.telephone_1}
                  onChange={(e) => setData('telephone_1', e.target.value)}
                  maxLength={100}
                />
              </div>
              <div className="p-1 w-3/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="telephone_2">
                  Telephone 2
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="telephone_2"
                  defaultValue={data.telephone_2}
                  onChange={(e) => setData('telephone_2', e.target.value)}
                  maxLength={100}
                />
              </div>
              <div className="p-1 w-3/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="vat_reg_no">
                  Vat Reg No
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10 "
                  type="text"
                  id="vat_reg_no"
                  defaultValue={data.vat_reg_no}
                  onChange={(e) => setData('vat_reg_no', e.target.value)}
                  maxLength={100}
                />
              </div>
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
