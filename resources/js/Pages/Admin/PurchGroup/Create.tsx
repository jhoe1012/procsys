import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { useState, useEffect, FormEventHandler } from 'react';
import { useForm, router } from '@inertiajs/react';
import { IPurchasingGroup, IPlants, IProcurementGroup, IPrCtrlGrp } from '@/types';
import { Button, Input, Label } from '@/Components/ui';
import { Modal } from '@/Components';
import { fetchMaterial } from '@/lib/Material';

export default function Create({
  plants,
  procgrps,
  prctrlgrp,
}: {
  plants: IPlants[];
  procgrps: IProcurementGroup[];
  prctrlgrp: IPrCtrlGrp[];
}) {
  const [showModal, setShowModal] = useState(false);
  const [mappedPlants, setMappedPlants] = useState([]);
  const [unmappedPlants, setUnmappedPlants] = useState<IPlants[]>(plants);
  const [filteredPrCtrlGrp, setFilteredPrCtrlGrp] = useState<IPrCtrlGrp[]>([]);

  const procGrpOptions = procgrps.map((p) => ({
    label: `${p.purch_grp} (${p.name1})`,
    value: p.purch_grp,
  }));

  const { data, setData, post, processing, reset, errors } = useForm({
    mat_code: '',
    plant: '',
    purch_grp: '',
    unit_issue: '',
    plan_deliv_time: '',
    gr_proc_time: '',
    min_lot_size: '',
    max_lot_size: '',
    fix_lot_size: '',
    rounding_value: '',
    prctrl_grp_id: '',
  });

  const handleMaterialChange = (option: any | null) => {
    setData('mat_code', option?.value ?? '');
    setData('plant', '');
    setMappedPlants(option?.mappedPlants || []);
  };

  const handlePlantChange = (plantCode: string) => {
    setData('plant', plantCode);
    setFilteredPrCtrlGrp(prctrlgrp.filter((grp) => grp.plant === plantCode));
  };

  useEffect(() => {
    const mappedPlantCodes = mappedPlants.map((mp: any) => mp.plant);
    const filtered = plants.filter((plant) => !mappedPlantCodes.includes(plant.plant));
    setUnmappedPlants(filtered);
  }, [mappedPlants, plants]);

  const createPurchGrp = (e: FormEvent) => {
    e.preventDefault();
    post(route('purchgrp.store'), {
      preserveScroll: true,
      onSuccess: closeModal,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    reset();
    setMappedPlants([]);
    setFilteredPrCtrlGrp([]);
    setUnmappedPlants(plants);
  };

  return (
    <section className={`space-y-6`}>
      <Button onClick={() => setShowModal(true)}>Add</Button>
      <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
        <form onSubmit={createPurchGrp}>
          <div className="overflow-y-auto" style={{ maxHeight: '70vh' }}>
            <div className="flex">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="material">
                Material
              </Label>
              <AsyncSelect
                id="material"
                className="m-2 w-full border-gray-500"
                cacheOptions
                defaultOptions
                loadOptions={fetchMaterial}
                value={data.mat_codeChoice}
                onChange={handleMaterialChange}
                placeholder=" Material"
                required
              />
            </div>
            <div className="flex">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="plant">
                Plant
              </Label>
              <Select
                id="plant"
                className="m-2 w-full border-gray-500"
                options={unmappedPlants.map((plant) => ({ label: plant.name1, value: plant.plant }))}
                value={
                  unmappedPlants.find((p) => p.plant === data.plant)
                    ? { label: unmappedPlants.find((p) => p.plant === data.plant)?.name1, value: data.plant }
                    : null
                }
                onChange={(option) => {
                  setData('plant', option ? option.value : '');
                  handlePlantChange(option ? option.value : '');
                }}
                placeholder=" Plant"
              />
            </div>
            <div className="flex">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="prctrl_grp">
                Controller Group
              </Label>
              <Select
                id="prctrl_grp_id"
                name="prctrl_grp_id"
                options={filteredPrCtrlGrp.map((grp) => ({
                  label: `${grp.prctrl_grp} (${grp.prctrl_desc})`,
                  value: grp.id,
                }))}
                onChange={(option: any) => {
                  setData('prctrl_grp_id', option ? option.value : '');
                }}
                placeholder=" Controller Group"
                className="m-2 w-full border-gray-500"
              />
            </div>
            <div className="flex">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="purch_grp">
                Purchase Group
              </Label>
              <Select
                id="purch_grp"
                className="m-2 w-full border-gray-500"
                options={procGrpOptions}
                onChange={(option: any) => {
                  setData('purch_grp', option ? option.value : '');
                }}
                placeholder="Purchase Group"
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="unit_issue">
                Unit Issue
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="unit_issue"
                defaultValue={data.unit_issue}
                onChange={(e) => setData('unit_issue', e.target.value)}
                required={true}
                maxLength={255}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="plan">
                Plan Delivery Time
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="plan_deliv_time"
                type="number"
                defaultValue={data.plan_deliv_time}
                onChange={(e) => setData('plan_deliv_time', e.target.value)}
                required={true}
                maxLength={255}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="gr_proc_time">
                GR Processing Time
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="gr_proc_time"
                type="number"
                defaultValue={data.gr_proc_time}
                onChange={(e) => setData('gr_proc_time', e.target.value)}
                required={true}
                maxLength={255}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="min_lot_size">
                Min Lot Size
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="min_lot_size"
                type="number"
                defaultValue={data.min_lot_size}
                onChange={(e) => setData('min_lot_size', e.target.value)}
                required={true}
                maxLength={255}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="max_lot_size">
                Max Lot Size
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="max_lot_size"
                type="number"
                defaultValue={data.max_lot_size}
                onChange={(e) => setData('max_lot_size', e.target.value)}
                required={true}
                maxLength={255}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="fix_lot_size">
                Fix Lot Size
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="fix_lot_size"
                type="number"
                defaultValue={data.fix_lot_size}
                onChange={(e) => setData('fix_lot_size', e.target.value)}
                required={true}
                maxLength={255}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="rounding_value">
                Rounding Value
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="rounding_value"
                type="number"
                defaultValue={data.rounding_value}
                onChange={(e) => setData('rounding_value', e.target.value)}
                required={true}
                maxLength={255}
              />
            </div>
          </div>
          <div className="grid justify-items-center m-5">
            <Button variant="outline" disabled={processing} className="bg-[#f8c110] hover:border-gray-500 hover:bg-[#f8c110] w-60">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
