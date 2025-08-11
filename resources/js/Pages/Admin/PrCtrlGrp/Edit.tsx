import { useState, useEffect, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { IPlants, IPrCtrlGrp } from '@/types';
import { Button, Input, Label } from '@/Components/ui';
import { Modal } from '@/Components';
import Select from 'react-select';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

export default function Edit({ prctrlgrps, plants }: { prctrlgrps: IPrCtrlGrp; plants: IPlants[] }) {
  const { data, setData, put, processing, reset, errors } = useForm({
    prctrl_grp: prctrlgrps.prctrl_grp,
    prctrl_desc: prctrlgrps.prctrl_desc,
    plant: prctrlgrps.plant,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedPlantOption, setSelectedPlantOption] = useState<{ label: string; value: string } | null>(null);

  const plantsOption = plants.map((p) => ({
    label: `${p.plant} - ${p.name1}`,
    value: p.plant,
  }));
  useEffect(() => {
    if (showModal && data.plant) {
      const matched = plantsOption.find((opt) => opt.value === data.plant);
      setSelectedPlantOption(matched || null);
    }
  }, [showModal, data.plant]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route('prctrlgrp.update', prctrlgrps.id), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
    });
  };

  const closeModal = () => {
    setShowModal(false);
    reset();
  };

  return (
    <section className="space-y-6">
      <PencilSquareIcon onClick={() => setShowModal(true)} className="size-6 cursor-pointer text-blue-500" />

      <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
        <form onSubmit={handleSubmit} className="m-2 p-5">
          <div className="m-2 p-5">
            <div className="flex">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="plant">
                Plant
              </Label>
              <Select
                id="plant"
                name="plant"
                className="m-2 w-full border-gray-500"
                options={plantsOption}
                value={selectedPlantOption}
                onChange={(option) => {
                  setData('plant', option ? option.value : ''); // <-- singular
                  setSelectedPlantOption(option || null);
                }}
                placeholder="Plant"
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
                value={data.prctrl_grp}
                onChange={(e) => setData('prctrl_grp', e.target.value)}
                required
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
                value={data.prctrl_desc}
                onChange={(e) => setData('prctrl_desc', e.target.value)}
                required
                maxLength={255}
              />
            </div>
          </div>
          <div className="grid justify-items-center mt-6">
            <Button
              variant="outline"
              disabled={processing}
              className="bg-[#f8c110] hover:border-gray-500 hover:bg-[#f8c110] w-60"
            >
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
