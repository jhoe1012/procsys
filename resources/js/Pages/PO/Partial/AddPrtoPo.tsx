import { Button } from '@/Components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { formatNumber } from '@/lib/utils';
import { useState } from 'react';

export default function AddPrtoPo({ p_vendor, p_plant, p_created_name, p_doc_date, addToPO }) {
  const [prMaterialSelected, setPrMaterialSelected] = useState([]);
  const [prMaterialList, setPrMaterialList] = useState([]);

  const [filterInputs, setFilterInputs] = useState({
    pr_number: '',
    material: '',
    mat_grp: '',
    purch_grp: '',
    short_text: '',
    del_date: '',
  });

  const handleAddPrToPo = async () => {
    try {
      const response = await window.axios.get(route('po.plant'), {
        params: { plant: p_plant, vendor: p_vendor, doc_date: p_doc_date },
      });
      setPrMaterialList(response.data.data);
    } catch (error) {
      console.error('Error fetching material info:', error);
    }
  };

  const handleCheckboxChange = (event, pr_material) => {
    if (event.target.checked) {
      setPrMaterialSelected([...prMaterialSelected, pr_material]);
    } else {
      setPrMaterialSelected(prMaterialSelected.filter((pr) => pr.id !== pr_material.id));
    }
  };

  const handleAddtoPO = () => {
    const updateSelectedMaterial = prMaterialSelected.map((item) => {
      let qty = undefined;
      let unit = item.unit;
      let per_unit = item.per_unit;
      let qty_open = item.qty_open;
      let net_price = undefined;
      let total_value = undefined;
      let min_order_qty = undefined;
      let conversion = 1;
      let denominator = 1;

      if (item.material_net_price[0]) {
        const altuom = item.alt_uom.find((uom) => uom.alt_uom == item.material_net_price[0].uom);
        qty = item.qty_open / (altuom.counter / altuom.denominator);
        qty_open = qty;
        conversion = altuom.counter;
        denominator = altuom.denominator;
        unit = item.material_net_price[0].uom;
        per_unit = item.material_net_price[0].per_unit;
        net_price = item.material_net_price[0].price;
        total_value = (item.material_net_price[0].price / item.material_net_price[0].per_unit) * qty;
        min_order_qty = item.material_net_price[0].min_order_qty;
      }

      return {
        ...item,
        del_date: new Date(item.del_date || ''),
        pr_material_id: item.id,
        pr_item: item.item_no,
        // po_qty: qty,
        qty_open: qty_open,
        unit: unit,
        per_unit: per_unit,
        net_price: net_price,
        total_value: total_value,
        item_no: undefined,
        id: undefined,
        min_order_qty: min_order_qty,
        conversion: conversion,
        denominator: denominator,
        converted_qty: item.qty_open,
        pr_unit: item.unit,
        purch_grp: item.purch_grp,
      };
    });

    addToPO(updateSelectedMaterial);

    // console.log('updateSelectedMaterial', updateSelectedMaterial);
    // console.log('prMaterialSelected', prMaterialSelected);

    setPrMaterialSelected([]);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilterInputs({ ...filterInputs, [id]: value });
  };

  const filteredPrMaterialList = prMaterialList.filter((pr) => {
    return (
      (filterInputs.pr_number === '' ||
        (pr.pr_number || '').toLowerCase().includes(filterInputs.pr_number.toLowerCase())) &&
      (filterInputs.material === '' ||
        (pr.mat_code || '').toLowerCase().includes(filterInputs.material.toLowerCase())) &&
      (filterInputs.mat_grp === '' || (pr.mat_grp || '').toLowerCase().includes(filterInputs.mat_grp.toLowerCase())) &&
      (filterInputs.purch_grp === '' ||
        (pr.purch_grp || '').toLowerCase().includes(filterInputs.purch_grp.toLowerCase())) &&
      (filterInputs.short_text === '' ||
        (pr.short_text || '').toLowerCase().includes(filterInputs.short_text.toLowerCase())) &&
      (filterInputs.del_date === '' || (pr.del_date || '').toLowerCase().includes(filterInputs.del_date.toLowerCase()))
    );
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="button"
          variant="outline"
          className="bg-blue-400 hover:bg-blue-500 hover:text-accent-foreground hover:border-gray-500"
          onClick={handleAddPrToPo}>
          Add PR to PO
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>PR Selection</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="flex items-center space-x-2 w-full">
            <div className="p-2 flex flex-wrap gap-4">
              <div className="flex-auto">
                <Label>PR Number</Label>
                <Input type="text" id="pr_number" value={filterInputs.pr_number} onChange={handleInputChange} />
              </div>

              <div className="flex-auto">
                <Label>Material</Label>
                <Input type="text" id="material" value={filterInputs.material} onChange={handleInputChange} />
              </div>

              <div className="flex-auto">
                <Label>Short Text</Label>
                <Input type="text" id="short_text" value={filterInputs.short_text} onChange={handleInputChange} />
              </div>

              <div className="flex-auto">
                <Label>Delivery Date</Label>
                <Input type="text" id="del_date" value={filterInputs.del_date} onChange={handleInputChange} />
              </div>

              <div className="flex-auto">
                <Label>Material Group</Label>
                <Input type="text" id="mat_grp" value={filterInputs.mat_grp} onChange={handleInputChange} />
              </div>

              <div className="flex-auto">
                <Label>Buyer Group</Label>
                <Input type="text" id="purch_grp" value={filterInputs.purch_grp} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className="overflow-y-auto h-96">
            <table className=" table-auto w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  border-gray-500 sticky top-0">
                <tr className="text-nowrap ">
                  <th className="px-3 py-1"> Sel</th>
                  <th className="px-3 py-1"> Pr</th>
                  <th className="px-3 py-1"> ItmNo</th>
                  <th className="px-3 py-1"> Material</th>
                  <th className="px-3 py-1"> Short</th>
                  <th className="px-3 py-1"> Open Qty</th>
                  <th className="px-3 py-1"> Price</th>
                  <th className="px-3 py-1"> Per</th>
                  <th className="px-3 py-1"> Unit</th>
                  <th className="px-3 py-1"> Total Value</th>
                  <th className="px-3 py-1"> Curr</th>
                  <th className="px-3 py-1"> Del</th>
                  <th className="px-3 py-1"> MatGrp</th>
                  <th className="px-3 py-1"> Buyer Grp</th>
                  <th className="px-3 py-1"> Requested</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredPrMaterialList.length > 0 ? (
                  filteredPrMaterialList.map((pr) => (
                    <tr className="bg-white border-b" key={pr.id}>
                      <td className="px-3 py-1">
                        <input type="checkbox" name="sel" onClick={() => handleCheckboxChange(event, pr)} />
                      </td>
                      <td className="px-3 py-1">{pr.pr_number}</td>
                      <td className="px-3 py-1">{pr.item_no}</td>
                      <td className="px-3 py-1">{pr.mat_code}</td>
                      <td className="px-3 py-1">{pr.short_text}</td>
                      <td className="px-3 py-1">{pr.qty_open}</td>
                      <td className="px-3 py-1 text-right">{formatNumber(pr.price)}</td>
                      <td className="px-3 py-1">{pr.per_unit}</td>
                      <td className="px-3 py-1">{pr.unit}</td>
                      <td className="px-3 py-1 text-right">{formatNumber(pr.total_value)}</td>
                      <td className="px-3 py-1">{pr.currency}</td>
                      <td className="px-3 py-1">{pr.del_date}</td>
                      <td className="px-3 py-1">{pr.mat_grp}</td>
                      <td className="px-3 py-1">{pr.purch_grp}</td>
                      <td className="px-3 py-1">{pr.requested_by}</td>
                    </tr>
                  ))
                ) : (
                  <td className="px-3 py-1 text-center" colSpan={14}>
                    No Records Found
                  </td>
                )}
              </tbody>
            </table>
          </div>
        </DialogDescription>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={handleAddtoPO}>
              Add to PO
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
