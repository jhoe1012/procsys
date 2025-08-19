import { InputField, Modal, SelectField } from '@/Components';
import { Button } from '@/Components/ui';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateProdOrd({ plants }) {
  const [showModal, setShowModal] = useState(false);
  const [plant, setPlant] = useState();
  const [delivDateFrom, setDelivDateFrom] = useState();
  const [delivDateTo, setDelivDateTo] = useState();

  // const { data, setData, post, processing, reset, errors } = useForm({
  //   plant: '',
  //   prod_date: '',
  //   deliv_date: '',
  // });

  // const createProdOrd: FormEventHandler = (e) => {
  //   e.preventDefault();

  //   post(route('production-plan.store'), {
  //     preserveScroll: true,
  //     onSuccess: () => setShowModal(false),
  //     //   onFinish: () => reset(),
  //   });
  // };

  return (
    <section className="space-y-6">
      <Button onClick={() => setShowModal(true)}>Create Production Order from SO</Button>

      <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="lg">
        <div className="p-5 flex flex-col">
          <SelectField
            label="Requesting Plant"
            items={plants}
            valueKey="plant"
            displayKey="name1"
            value={plant}
            onValueChange={(value) => {
              setPlant(value);
            }}
            displayValue={true}
          />

          <InputField
            label="Delivery Date From"
            id="prod_date"
            type="date"
            className="w-50"
            onChange={(e) => {
              setDelivDateFrom(e.target.value);
            }}
            value={delivDateFrom}
          />
          {/* <InputField
            label="Delivery Date To"
            id="deliv_date"
            type="date"
            className="w-50"
            onChange={(e) => {
              setDelivDateTo(e.target.value);
            }}
            value={delivDateTo}
          /> */}
          {/* <div className="grid justify-items-center m-3">
              <Button variant="outline" disabled={processing} className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-60">
                Save
              </Button> */}
          <div className="grid justify-items-center m-3">
            <Link
              preserveScroll
              href={route('production-plan.create')}
              data={{ plant: plant, delivDateFrom: delivDateFrom }}
              as="button"
              type="button"
              disabled={!plant || !delivDateFrom}
              className="m-2 p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-60">
              Submit
            </Link>
          </div>
        </div>
      </Modal>
    </section>
  );
}
