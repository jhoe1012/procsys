import { useState, FormEventHandler } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import AsyncSelect from 'react-select/async';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { IApprover } from '@/types';
import Select from 'react-select';

export default function Edit({ p_plants, p_approver }) {
  const [showModal, setShowModal] = useState(false);

  const { data, setData, patch, processing, reset, errors } = useForm<IApprover>({
    type: p_approver.type,
    typeChoice: [{label: p_approver.type.toUpperCase(), value: p_approver.type.toUpperCase()}],
    plant: p_approver.plant,
    plantChoice: [{ value: p_approver.plant, label: `${p_approver.plant}-${p_approver.plants?.name1}` }],
    user_id: p_approver.user_id,
    user_idChoice: [{ value: p_approver.user_id, label: p_approver.user.name }],
    position: p_approver.position,
    amount_from: p_approver.amount_from,
    amount_to: p_approver.amount_to,
    seq: p_approver.seq,
    desc: p_approver.desc,
    _method:'patch',
  });

  const approver_type = [
    { label: 'PO', value: 'PO' },
    { label: 'PR', value: 'PR' },
  ];

  const updateApprover: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('approver.update', p_approver.id), {
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

  const fetchUser = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await window.axios.get(route('user.search', { search: inputValue }));

      return response.data.data.map((item) => ({
        value: item.id,
        label: item.name,
        position: item.position,
      }));
    } catch (e) {
      console.log('Error fetching data:', e);
      return [];
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

      {/* <Button onClick={() => setShowModal(true)}>Add</Button> */}

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
                value={data.typeChoice}
                options={approver_type}
                onChange={(option: any) => setData({ ...data, type: option?.value })}
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
                value={data.plantChoice}
                options={p_plants}
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
              <Button
                variant="outline"
                disabled={processing}
                className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-60">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </section>
  );
}
