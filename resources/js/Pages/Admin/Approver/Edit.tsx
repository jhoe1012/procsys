import { useState, FormEventHandler } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import AsyncSelect from 'react-select/async';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Choice, IApprover } from '@/types';
import Select from 'react-select';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { fetchUser } from '@/lib/User';

export default function Edit({
  plantChoice,
  p_approver,
  prCtrlGrpsChoice,
}: {
  plantChoice: Choice[];
  p_approver: IApprover;
  prCtrlGrpsChoice: Choice[];
}) {
  const [showModal, setShowModal] = useState(false);

  const { data, setData, patch, processing, reset, errors } = useForm<IApprover>({
    type: p_approver.type,
    typeChoice: { label: p_approver.type.toUpperCase(), value: p_approver.type.toUpperCase() },
    plant: p_approver.plant,
    plantChoice: { value: p_approver.plant, label: `${p_approver.plant}-${p_approver.plants?.name1}` },
    user_id: p_approver.user_id,
    user_idChoice: { value: p_approver.user_id, label: p_approver.user.name },
    position: p_approver.position,
    amount_from: p_approver.amount_from,
    amount_to: p_approver.amount_to,
    seq: p_approver.seq,
    desc: p_approver.desc,
    prctrl_grp_id: p_approver.prctrl_grp_id,
    prCtrlGrpsChoice: p_approver.prCtrlGrps
      ? {
          value: p_approver.prCtrlGrps?.id,
          label: `${p_approver.prCtrlGrps?.plant_id} - ${p_approver.prCtrlGrps?.prctrl_grp} ${p_approver.prCtrlGrps?.prctrl_desc}`,
        }
      :null,
    _method: 'patch',
  });

  const approver_type = [
    { label: 'PO', value: 'po' },
    { label: 'PR', value: 'pr' },
  ];

  const updateApprover: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('approver.update', p_approver.id), {
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

      <Modal show={showModal} onClose={closeModal} maxWidth="lg">
        <form onSubmit={updateApprover}>
          <div className="m-2">
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="type">
                Type
              </Label>
              <Select
                id="type"
                className="m-2 w-full border-gray-500"
                value={approver_type.find((type) => type.value == data.type)}
                options={approver_type}
                onChange={(option: any) => setData({ ...data, type: option?.value, typeChoice: option })}
                placeholder="Select Type"
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
                value={ plantChoice.find((plant) => plant.value == data.plant ) }
                options={plantChoice}
                onChange={(option: any) => setData({ ...data, plant: option?.value, plantChoice: option })}
                placeholder="Select Plant"
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="user">
                User
              </Label>
              <AsyncSelect
                id="user"
                className="m-2 w-full border-gray-500"
                cacheOptions
                defaultOptions
                loadOptions={fetchUser}
                value={data.user_idChoice}
                onChange={(option: any) => {
                  setData({ ...data, user_id: option.value, user_idChoice: option, position: option.position });
                }}
                placeholder="Select User"
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="plant">
                Controller Group
              </Label>
              <Select
                id="prctrl_grp"
                className="m-2 w-full border-gray-500"
                value={prCtrlGrpsChoice.find((grp) => grp.value == data.prctrl_grp_id)}
                options={prCtrlGrpsChoice}
                onChange={(option: any) => setData({ ...data, prctrl_grp_id: option?.value  })}
                placeholder="Select Cotroller Group"
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="position">
                Position
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="text"
                id="position"
                defaultValue={data.position}
                value={data.position}
                onChange={(e) => setData('position', e.target.value)}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="amount_from">
                Amount From
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="number"
                id="amount_from"
                defaultValue={data.amount_from}
                onChange={(e) => setData('amount_from', parseFloat(e.target.value))}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="amount_to">
                Amount To
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="text"
                id="amount_to"
                defaultValue={data.amount_to}
                onChange={(e) => setData('amount_to', parseFloat(e.target.value))}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="seq">
                Sequence
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="text"
                id="seq"
                defaultValue={data.seq}
                onChange={(e) => setData('seq', parseFloat(e.target.value))}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="desc">
                Description
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="text"
                id="desc"
                defaultValue={data.desc}
                onChange={(e) => setData('desc', e.target.value)}
              />
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
