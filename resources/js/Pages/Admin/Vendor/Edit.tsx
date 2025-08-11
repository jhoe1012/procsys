import { useState, FormEventHandler } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { IVendor } from '@/types';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

export default function Edit({ p_vendor }: { p_vendor: IVendor }) {
  const [showModal, setShowModal] = useState(false);

  const { data, setData, patch, processing, reset, errors } = useForm<IVendor>({
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
    // telephone_2: p_vendor.telephone_2,
    vat_reg_no: p_vendor.vat_reg_no,
    email_1: p_vendor.email_1,
    // email_2: p_vendor.email_2,
    payment_terms: p_vendor.payment_terms,
    _method: 'patch',
  });

  const updateVendor: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('vendor.update', p_vendor.id), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setShowModal(false);

    reset();
  };

  return (
    <section className={`space-y-6`}>
      <PencilSquareIcon onClick={() => setShowModal(true)} className="size-6 cursor-pointer text-blue-500" />

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
                  required={true}
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
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="payment_terms">
                  Payment Terms
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10"
                  type="text"
                  id="payment_terms"
                  defaultValue={data.payment_terms}
                  onChange={(e) => setData('payment_terms', e.target.value)}
                  maxLength={100}
                  required={false}
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
            <div className="flex px-2">
              <div className="p-1 w-6/12">
                <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="email_1">
                  Email Address
                </Label>
                <Input
                  className="m-2 w-full border-gray-300 h-10"
                  type="email"
                  id="email_1"
                  defaultValue={data.email_1}
                  onChange={(e) => setData('email_1', e.target.value)}
                  maxLength={100}
                  required={false}
                />
              </div>
            </div> 

            <div className="grid justify-items-center m-3">
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
