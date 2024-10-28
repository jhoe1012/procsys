import { useState, FormEventHandler } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import AsyncSelect from 'react-select/async';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { IApprover, IPlants } from '@/types';
import Select from 'react-select';

export default function Create({ p_plants }) {
  const [showModal, setShowModal] = useState(false);

  const { data, setData, post, processing, reset, errors } = useForm<IApprover>({
    type: '',
    plant: '',
    user_id: 0,
    position: '',
    amount_from: 0,
    amount_to: 0,
    seq: 0,
    desc: '',
  });
  const approver_type = [
    { label: 'PO', value: 'PO' },
    { label: 'PR', value: 'PR' },
  ];

  const createApprover: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('approver.store'), {
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
      <Button onClick={() => setShowModal(true)}>Add</Button>

      <Modal show={showModal} onClose={closeModal} maxWidth="lg">
        <form onSubmit={createApprover}>
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
