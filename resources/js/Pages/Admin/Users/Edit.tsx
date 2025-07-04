import { useState, useEffect, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { IDeliveryAddress, IPlants, IPrCtrlGrp, IRoles, User } from '@/types';
import { Button, Input, Label } from '@/Components/ui';
import { Modal } from '@/Components';
import Select from 'react-select';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

export default function Edit({
  user,
  roles,
  plants,
  prCtrlGrp,
  deliveryAddress,
}: {
  user: User;
  roles: IRoles[];
  plants: IPlants[];
  prCtrlGrp: IPrCtrlGrp[];
  deliveryAddress: IDeliveryAddress[];
}) {
  const { data, setData, put, processing, reset, errors } = useForm({
    name: user.name,
    email: user.email,
    position: user.position,
    roles: [],
    plants: [],
    prCtrlGrps: [],
    deliveryAddress: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [rolesSelected, setRolesSelected] = useState(user?.roles?.map((role) => ({ label: role.name, value: role.name })));
  const [plantsSelected, setPlantsSelected] = useState(
    user?.plants?.map((plant) => ({ label: `${plant.plant} - ${plant.name1}`, value: plant.id }))
  );
  const [prCtrlGrpsSelected, setPrCtrlGrpsSelected] = useState(
    user?.prCtrlGrps?.map((pr) => ({ label: `${pr.plant_id} - ${pr.prctrl_desc}`, value: pr.id }))
  );
  const [deliveryAddressSelected, setDeliveryAddressSelected] = useState(
    user?.delivery_addresses?.map((address) => ({ label: `${address.plant} - ${address.address}`, value: address.id }))
  );

  const rolesChoice = roles.map((role) => ({ label: role.name, value: role.name }));
  const plantsChoice = plants.map((plant) => ({ label: `${plant.plant} - ${plant.name1}`, value: plant.id }));
  const prCtrlGrpChoice = prCtrlGrp
    .filter((pr) => data.plants.includes(pr.plant_id))
    .map((pr) => ({ label: `${pr.plant_id} - ${pr.prctrl_desc}`, value: pr.id }));
  const deliveryAddressChoice = deliveryAddress.map((address) => ({ label: `${address.plant} - ${address.address}`, value: address.id }));

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route('user.update', user.id), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
    });
  };

  const closeModal = () => {
    setShowModal(false);
    reset();
  };

  useEffect(() => {
    setData({
      ...data,
      roles: rolesSelected.map((r) => r.value),
      plants: plantsSelected.map((p) => p.value),
      prCtrlGrps: prCtrlGrpsSelected.map((g) => g.value),
      deliveryAddress: deliveryAddressSelected.map((d) => d.value),
    });
  }, [rolesSelected, plantsSelected, prCtrlGrpsSelected, deliveryAddressSelected]);

  const renderSelect = (label: string, id: string, options: any, value: any, onChange: any, isMulti = false, isDisabled = false) => (
    <div className="flex">
      <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor={id}>
        {label}
      </Label>
      <Select
        id={id}
        className="m-2 w-full border-gray-500"
        options={options}
        value={value}
        onChange={onChange}
        isMulti={isMulti}
        isDisabled={isDisabled}
        placeholder={`Select ${label}`}
      />
    </div>
  );

  const renderInput = (label: string, id: string, type = 'text', required = false) => (
    <div className="flex">
      <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor={id}>
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        className="m-2 w-full border-gray-300 h-10"
        defaultValue={data[id]}
        onChange={(e) => setData(id, e.target.value)}
        required={required}
        maxLength={255}
      />
    </div>
  );

  return (
    <section className="space-y-6">
      <PencilSquareIcon onClick={() => setShowModal(true)} className="size-6 cursor-pointer text-blue-500" />

      <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
        <form onSubmit={handleSubmit} className="m-2 p-5">
          {renderSelect('Role', 'roles', rolesChoice, rolesSelected, setRolesSelected, true)}
          {renderSelect('Plant', 'plants', plantsChoice, plantsSelected, setPlantsSelected, true)}
          {renderSelect(
            'Controller Group',
            'prCtrlGrps',
            prCtrlGrpChoice,
            prCtrlGrpsSelected,
            setPrCtrlGrpsSelected,
            true,
            !data.plants.length
          )}
          {renderSelect(
            'CC by Deliv. Addr.',
            'deliveryAddress',
            deliveryAddressChoice,
            deliveryAddressSelected,
            setDeliveryAddressSelected,
            true
          )}
          {renderInput('Name', 'name', 'text', true)}
          {renderInput('Email', 'email', 'email', true)}
          {renderInput('Position', 'position')}

          <div className="grid justify-items-center mt-6">
            <Button variant="outline" disabled={processing} className="bg-[#f8c110] hover:border-gray-500 hover:bg-[#f8c110] w-60">
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
