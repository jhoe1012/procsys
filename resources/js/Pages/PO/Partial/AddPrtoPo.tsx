import { Checkbox, InputField } from '@/Components';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/ui';
import { usePOMaterial } from '@/Hooks';
import { formatNumber } from '@/lib/utils';
import { IAlternativeUom, IPOMaterial } from '@/types';
import { useCallback, useMemo, useState } from 'react';

const filterInputLabel = {
  pr_number: 'PR Number',
  mat_code: 'Material Code',
  short_text: 'Material Description',
  item_text: 'Item Text',
  mat_grp: 'Material Group',
  del_date: 'Delivery Date',
  purch_grp: 'Buyer Group',
  requested_by: 'Requested By',
};

export default function AddPrtoPo({ p_plant, p_doc_date, addToPO }) {
  const [prMaterialSelected, setPrMaterialSelected] = useState<IPOMaterial[]>([]);
  const [prMaterialList, setPrMaterialList] = useState<IPOMaterial[]>([]);
  const { computeConversion } = usePOMaterial();

  const [filterInputs, setFilterInputs] = useState({
    pr_number: '',
    mat_code: '',
    short_text: '',
    item_text: '',
    del_date: '',
    mat_grp: '',
    purch_grp: '',
    requested_by:'',
  });

  const fetchPrMaterials = useCallback(async () => {
    try {
      const response = await window.axios.get(route('po.plant'), {
        params: { plant: p_plant, doc_date: p_doc_date },
      });
      setPrMaterialList(response.data.data);
    } catch (error) {
      console.error('Error fetching material info:', error);
    }
  }, [p_plant, p_doc_date]);

  const handleCheckboxChange = useCallback((event, pr_material) => {
    setPrMaterialSelected((prevSelected) =>
      event.target.checked ? [...prevSelected, pr_material] : prevSelected.filter((pr) => pr.id !== pr_material.id)
    );
  }, []);

  const handleAddtoPO = () => {
    const updateSelectedMaterial = prMaterialSelected?.map((item) => {
      const altUomSelect = [...new Set([item.ord_unit, ...item?.alt_uom?.map((uom: IAlternativeUom) => uom.alt_uom)])];
      return {
        ...item,
        ...computeConversion(item, item.ord_unit ?? ''),
        del_date: new Date(item.del_date || ''),
        pr_material_id: item.id,
        id: undefined,
        pr_item: item.item_no,
        pr_unit: item.unit,
        altUomSelect: altUomSelect,
        mat_grp_desc: item.materialGroups?.mat_grp_desc || '',
        item_no: undefined,
      };
    });
    addToPO(updateSelectedMaterial);
    setPrMaterialSelected([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFilterInputs({ ...filterInputs, [id]: value });
  };

  const filteredPrMaterialList = useMemo(() => {
    return prMaterialList.filter((pr) =>
      Object.entries(filterInputs).every(([key, value]) => value === '' || (pr[key]?.toLowerCase() || '').includes(value.toLowerCase()))
    );
  }, [prMaterialList, filterInputs]);

  return (
    <Dialog>
      <DialogTrigger
        onClick={fetchPrMaterials}
        className="bg-blue-400 hover:bg-blue-500 hover:text-accent-foreground hover:border-gray-500 border border-input bg-background hover:bg-accent inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        Add PR to PO
      </DialogTrigger>
      <DialogContent className="min-w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>PR Selection</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="flex  items-center space-x-2 text-black">
            <div className="p-2 flex flex-wrap gap-4  w-full">
              {Object.keys(filterInputs).map((key) => (
                <InputField key={key} label={filterInputLabel[key]} id={key} value={filterInputs[key]} onChange={handleInputChange} />
              ))}
            </div>
          </div>

          <div className="overflow-y-auto h-[70vh] text-black">
            <table className=" table-auto w-full text-sm text-left rtl:text-right">
              <thead className="text-xs  uppercase bg-gray-50  border-gray-500 sticky top-0">
                <tr className="text-nowrap ">
                  <th className="px-3 py-1"> Sel</th>
                  <th className="px-3 py-1"> Pr</th>
                  <th className="px-3 py-1"> Material</th>
                  <th className="px-3 py-1"> Material Description</th>
                  <th className="px-3 py-1"> Item Text </th>
                  <th className="px-3 py-1"> Open Qty</th>
                  <th className="px-3 py-1"> Unit</th>
                  <th className="px-3 py-1"> Per</th>
                  <th className="px-3 py-1"> Price</th>
                  <th className="px-3 py-1"> Total Value</th>
                  <th className="px-3 py-1"> Curr</th>
                  <th className="px-3 py-1"> Del Date</th>
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
                        {/* <input type="checkbox" name="sel" onChange={(event) => handleCheckboxChange(event, pr)} /> */}
                        <Checkbox name="sel" onChange={(event) => handleCheckboxChange(event, pr)} />
                      </td>
                      <td className="px-3 py-1">{pr.pr_number}</td>
                      <td className="px-3 py-1">{pr.mat_code}</td>
                      <td className="px-3 py-1">{pr.short_text}</td>
                      <td className="px-3 py-1">{pr.item_text}</td>
                      <td className="px-3 py-1">{pr.qty_open}</td>
                      <td className="px-3 py-1">{pr.ord_unit}</td>
                      <td className="px-3 py-1">{pr.per_unit}</td>
                      <td className="px-3 py-1 text-right">{formatNumber(pr.price ?? 0)}</td>
                      <td className="px-3 py-1 text-right">{formatNumber(pr.total_value ?? 0)}</td>
                      <td className="px-3 py-1">{pr.currency}</td>
                      <td className="px-3 py-1">{pr.del_date ?? ''}</td>
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
