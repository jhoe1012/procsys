import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { useState, useEffect, FormEventHandler } from 'react';
import { useForm, router } from '@inertiajs/react';
import { IPurchasingGroup, IPlants, IProcurementGroup, IPrCtrlGrp } from '@/types';
import { Button, Input, Label } from '@/Components/ui';
import { Modal } from '@/Components';
import { fetchMaterial } from '@/lib/Material';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

export default function Edit({
  p_purchgrp,
  plants,
  procgrps,
  prctrlgrp,
}: {
  p_purchgrp: IPurchasingGroup;
  plants: IPlants[];
  procgrps: IProcurementGroup[];
  prctrlgrp: IPrCtrlGrp[];
}) {
  const [showModal, setShowModal] = useState(false);
  const [filteredPrCtrlGrp, setFilteredPrCtrlGrp] = useState<IPrCtrlGrp[]>([]);

  const { data, setData, patch, processing, reset, errors } = useForm<IPurchasingGroup>({
    id: p_purchgrp.id,
    mat_code: p_purchgrp.mat_code,
    mat_codeChoice: p_purchgrp.materials && {
      value: p_purchgrp.materials.mat_code,
      label: `${p_purchgrp.materials.mat_code} - ${p_purchgrp.materials.mat_desc}`,
    },
    plant: p_purchgrp.plant,
    purch_grp: p_purchgrp.purch_grp,
    unit_issue: p_purchgrp.unit_issue,
    plan_deliv_time: p_purchgrp.plan_deliv_time,
    gr_proc_time: p_purchgrp.gr_proc_time,
    min_lot_size: p_purchgrp.min_lot_size,
    max_lot_size: p_purchgrp.max_lot_size,
    fix_lot_size: p_purchgrp.fix_lot_size,
    rounding_value: p_purchgrp.rounding_value,
    prctrl_grp_id: p_purchgrp.prctrl_grp_id,
    _method: 'patch',
  });

  useEffect(() => {
    if (showModal) {
      const filtered = prctrlgrp.filter((grp) => grp.plant === data.plant);
      setFilteredPrCtrlGrp(filtered);
    }
  }, [showModal, prctrlgrp, data.plant]);

  const updatePurchGrp: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('purchgrp.update', p_purchgrp.id), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
        router.reload();
      },
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
      <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
        <form onSubmit={updatePurchGrp}>
          <div className="overflow-y-auto" style={{ maxHeight: '70vh' }}>
            <div className="flex">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="material">
                Material
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                id="material"
                value={data.mat_codeChoice?.label || ''}
                readOnly
                disabled
              />
            </div>
            <div className="flex">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="plant">
                Plant
              </Label>
              <Select
                id="plant"
                className="m-2 w-full border-gray-500"
                options={plants.map((plant) => ({
                  label: `${plant.plant} - ${plant.name1}`,
                  value: String(plant.plant),
                }))}
                value={(() => {
                  const selected = plants.find((p) => String(p.plant) === String(data.plant));
                  return selected ? { label: `${selected.plant} - ${selected.name1}`, value: String(selected.plant) } : null;
                })()}
                onChange={(option) => {
                  const selectedPlant = option ? option.value : '';
                  setData('plant', selectedPlant);

                  const filtered = prctrlgrp.filter((grp) => grp.plant === selectedPlant);
                  setFilteredPrCtrlGrp(filtered);
                }}
                placeholder="Select Plant"
              />
            </div>
            <div className="flex">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="prctrl_grp_id">
                Controller Group
              </Label>
              <Select
                id="prctrl_grp_id"
                name="prctrl_grp_id"
                className="m-2 w-full border-gray-500"
                options={filteredPrCtrlGrp.map((grp) => ({
                  label: `${grp.prctrl_grp} (${grp.prctrl_desc})`,
                  value: grp.id,
                }))}
                onChange={(option: any) => {
                  setData('prctrl_grp_id', option ? option.value : '');
                }}
                value={
                  filteredPrCtrlGrp
                    .map((grp) => ({
                      label: `${grp.prctrl_grp} (${grp.prctrl_desc})`,
                      value: grp.id,
                    }))
                    .find((opt) => opt.value === data.prctrl_grp_id) || null
                }
                placeholder="Select Controller Group"
              />
            </div>
            <div className="flex">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="purch_grp">
                Purchase Group
              </Label>
              <Select
                id="purch_grp"
                name="purch_grp"
                className="m-2 w-full border-gray-500"
                options={procgrps.map((grp) => ({
                  label: `${grp.purch_grp} - ${grp.name1}`,
                  value: grp.purch_grp,
                }))}
                placeholder="Select Purchase Group"
                onChange={(option: any) => {
                  setData('purch_grp', option ? option.value : '');
                }}
                value={
                  procgrps
                    .map((grp) => ({
                      label: `${grp.purch_grp} - ${grp.name1}`,
                      value: grp.purch_grp,
                    }))
                    .find((opt) => opt.value === data.purch_grp) || null
                }
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
