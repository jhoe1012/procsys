import { useState, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { Choice, IMaterial } from '@/types';
import { Button, Input, Label } from '@/Components/ui';
import { Modal } from '@/Components';
import Select from 'react-select';

export default function Create({ materialGroups }: { materialGroups: Choice[] }) {
  const [showModal, setShowModal] = useState(false);

  const { data, setData, post, processing, reset, errors } = useForm<IMaterial>({
    mat_code: '',
    mat_desc: '',
    old_mat_code: '',
    mat_type: '',
    mat_grp_code: '',
    base_uom: '',
    order_uom: '',
    min_rem_shelf_life: 0,
    total_shelf_life: 0,
  });

  const createMaterial: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('material.store'), {
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
      <Button onClick={() => setShowModal(true)}>Add</Button>

      <Modal show={showModal} onClose={closeModal} maxWidth="xl">
        <form onSubmit={createMaterial}>
          <div className="m-2 px-5">
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="mat_code">
                Material
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="mat_code"
                defaultValue={data.mat_code}
                onChange={(e) => setData('mat_code', e.target.value)}
                required={true}
                maxLength={20}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="mat_desc">
                Description
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="mat_desc"
                defaultValue={data.mat_desc}
                onChange={(e) => setData('mat_desc', e.target.value)}
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="old_mat_code">
                Old Material
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="old_mat_code"
                defaultValue={data.old_mat_code}
                onChange={(e) => setData('old_mat_code', e.target.value)}
                maxLength={20}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="mat_type">
                Material Type
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="mat_type"
                defaultValue={data.mat_type}
                onChange={(e) => setData('mat_type', e.target.value)}
                required={true}
                maxLength={10}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="mat_grp_code">
                Material Group
              </Label>
              <Select
                id="mat_grp_code"
                className="m-2 w-full border-gray-500"
                options={materialGroups}
                onChange={(option: any) => setData({ ...data, mat_grp_code: option?.value })}
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="base_uom">
                Base UOM
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="base_uom"
                defaultValue={data.base_uom}
                onChange={(e) => setData('base_uom', e.target.value)}
                maxLength={10}
              />
            </div>

            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="order_uom">
                Order UOM
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="order_uom"
                defaultValue={data.order_uom}
                onChange={(e) => setData('order_uom', e.target.value)}
                maxLength={10}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="min_rem_shelf_life">
                Min Shelf Life
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="min_rem_shelf_life"
                defaultValue={data.min_rem_shelf_life}
                onChange={(e) => setData('min_rem_shelf_life', parseFloat(e.target.value))}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="total_shelf_life">
                Total Shelf Life
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="total_shelf_life"
                defaultValue={data.total_shelf_life}
                onChange={(e) => setData('total_shelf_life', parseFloat(e.target.value))}
              />
            </div>
            <div className="grid justify-items-center mb-5">
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
