import { useState, FormEventHandler } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { IPrCtrlGrp, IPlants } from '@/types';
import Select from 'react-select';

export default function Create({ plants }: { plants: IPlants[] }) {
  const [showModal, setShowModal] = useState(false);

  const { data, setData, post, processing, reset, errors } = useForm({
    prctrl_grp: '',
    prctrl_desc: '',
    plant: '',
  });

  const plantsOption = plants.map((p) => ({
    label: `${p.plant} - ${p.name1}`,
    value: p.plant,
  }));

  const createPrctrlGrp: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('prctrlgrp.store'), {
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
      <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
        <form onSubmit={createPrctrlGrp}>
          <div className="m-2 p-5">
            <div className="flex">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="plant">
                Plant
              </Label>
              <Select
                id="plant"
                className="m-2 w-full border-gray-500"
                options={plantsOption}
                onChange={(option) => {
                  setData('plant', option ? option.value : '');
                  //   handlePlantChange(option ? option.value : '');
                }}
                placeholder=" Plant"
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="prctrl_grp">
                Controller Group
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="prctrl_grp"
                name="prctrl_grp"
                type="text"
                defaultValue={data.prctrl_grp}
                onChange={(e) => setData('prctrl_grp', e.target.value)}
                required={true}
                maxLength={255}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="prctrl_desc">
                Description
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="prctrl_desc"
                name="prctrl_desc"
                type="text"
                defaultValue={data.prctrl_desc}
                onChange={(e) => setData('prctrl_desc', e.target.value)}
                required={true}
                maxLength={255}
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
