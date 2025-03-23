import { useState, FormEventHandler, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { IPlants, IRoles } from '@/types';
import { Button, Input, Label } from '@/Components/ui';
import { Modal } from '@/Components';
import Select from 'react-select';

export default function Create({ roles, plants }: { roles: IRoles[]; plants: IPlants[] }) {
  const [showModal, setShowModal] = useState(false);
  const [rolesSelected, setrolesSelected] = useState([]);
  const [plantsSelected, setPlantsSelected] = useState([]);
  const rolesChoice = roles.map((role) => ({ label: role.name, value: role.name }));
  const plantsChoice = plants.map((plant) => ({ label: plant.name1, value: plant.id }));

  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    email: '',
    password: '',
    position: '',
    roles: [],
    plants: [],
  });

  const createMaterial: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('user.store'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setrolesSelected([]);
    setPlantsSelected([]);
    reset();
  };
  useEffect(() => {
    setData({ ...data, roles: rolesSelected.map((role) => role.value), plants: plantsSelected.map((plant) => plant.value) });
  }, [rolesSelected, plantsSelected]);

  return (
    <section className={`space-y-6`}>
      <Button onClick={() => setShowModal(true)}>Add</Button>

      <Modal show={showModal} onClose={closeModal} maxWidth="xl">
        <form onSubmit={createMaterial}>
          <div className="m-2 p-5 ">
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="roles">
                Role
              </Label>
              <Select
                id="plant"
                className="m-2 w-full border-gray-500"
                options={rolesChoice}
                onChange={(option: any) => setrolesSelected(option)}
                placeholder="Select Role"
                required={true}
                isMulti
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="plants">
                Plant
              </Label>
              <Select
                id="plant"
                className="m-2 w-full border-gray-500"
                options={plantsChoice}
                onChange={(option: any) => setPlantsSelected(option)}
                placeholder="Select Plant"
                required={true}
                isMulti
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="name">
                Name
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="name"
                defaultValue={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required={true}
                maxLength={255}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="email">
                Email
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="email"
                defaultValue={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required={true}
                maxLength={255}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="password">
                Password
              </Label>
              <Input
                type="password"
                className="m-2 w-full border-gray-300 h-10 "
                id="password"
                defaultValue={data.password}
                onChange={(e) => setData('password', e.target.value)}
                required={true}
                maxLength={255}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="position">
                Position
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="position"
                defaultValue={data.position}
                onChange={(e) => setData('position', e.target.value)}
                maxLength={255}
              />
            </div>

            <div className="grid justify-items-center mt-6">
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
