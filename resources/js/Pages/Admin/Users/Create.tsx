import { useState, useEffect, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { IDeliveryAddress, IPlants, IPrCtrlGrp, IRoles } from '@/types';
import { Button, Input, Label } from '@/Components/ui';
import { Modal } from '@/Components';
import Select from 'react-select';

export default function Create({
  roles,
  plants,
  prCtrlGrp,
  deliveryAddress,
}: {
  roles: IRoles[];
  plants: IPlants[];
  prCtrlGrp: IPrCtrlGrp[];
  deliveryAddress: IDeliveryAddress[];
}) {
  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    email: '',
    password: '',
    position: '',
    roles: [],
    plants: [],
    prCtrlGrps: [],
    deliveryAddress: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [rolesSelected, setRolesSelected] = useState([]);
  const [plantsSelected, setPlantsSelected] = useState([]);
  const [prCtrlGrpsSelected, setPrCtrlGrpsSelected] = useState([]);
  const [deliveryAddressSelected, setDeliveryAddressSelected] = useState([]);

  const rolesChoice = roles.map((role) => ({ label: role.name, value: role.name }));
  const plantsChoice = plants.map((plant) => ({ label: `${plant.plant} - ${plant.name1}`, value: plant.id }));
  const prCtrlGrpChoice = prCtrlGrp
    .filter((pr) => data.plants.includes(pr.plant_id))
    .map((pr) => ({ label: `${pr.plant_id} - ${pr.prctrl_desc}`, value: pr.id }));
  const deliveryAddressChoice = deliveryAddress.map((address) => ({ label: `${address.plant} - ${address.address}`, value: address.id }));

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('user.store'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setRolesSelected([]);
    setPlantsSelected([]);
    setPrCtrlGrpsSelected([]);
    setDeliveryAddressSelected([]);
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
        value={data[id]}
        onChange={(e) => setData(id, e.target.value)}
        required={required}
        maxLength={255}
      />
    </div>
  );

  return (
    <section className="space-y-6">
      <Button onClick={() => setShowModal(true)}>Add</Button>

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
          {renderInput('Password', 'password', 'password', true)}
          {renderInput('Position', 'position')}

          <div className="grid justify-items-center mt-6">
            <Button variant="outline" disabled={processing} className="bg-[#f8c110] hover:border-gray-500 hover:bg-[#f8c110] w-60">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
