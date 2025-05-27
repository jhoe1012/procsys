import { Choice, IPRMaterial } from '@/types';
import { useState } from 'react';
import { Operation } from 'react-datasheet-grid/dist/types';

const materialCache: { [key: string]: any } = {}; // Cache for getMaterialInfo results

export default function usePRMaterial() {
  const [isLoading, setIsLoading] = useState(false);

  const getMaterialInfo = async (material: string, plant: string, doc_date: string) => {
    if (!materialCache[material]) {
      try {
        const { data } = await window.axios.get(route('material.details'), {
          params: { material, plant, doc_date },
        });
        materialCache[material] = data?.data;
      } catch (error) {
        console.error(`Error fetching material info for "${material}":`, error);
        materialCache[material] = null;
      }
    }

    return materialCache[material];
  };

  const computeConversion = (material: IPRMaterial, ord_unit: string, isGenericMaterial: boolean = false) => {
    const altUom = material.alt_uom?.find(({ alt_uom }) => alt_uom === ord_unit) || {};
    const conversion = (altUom.counter ?? 1) / (altUom.denominator ?? 1);
    let price = 0;
    if (isGenericMaterial) {
      price = material.price * conversion;
    } else {
      price = material.valuation_price * conversion;
    }
    const converted_qty = (material.qty ?? 0) * conversion;
    const total_value = ((price ?? 0) / (material.per_unit ?? 0)) * (material.qty ?? 0);

    return { conversion, price, converted_qty, total_value, ord_unit };
  };

  const updateMaterialPR = async (
    newValue: IPRMaterial[],
    operations: Operation[],
    material: IPRMaterial[],
    plant: string,
    doc_date: string,
    materialGeneric: string[],
    prCtrlGrp: Choice[]
  ): Promise<IPRMaterial[]> => {
    const updatedMaterial = [...newValue];
    setIsLoading(true);

    for (const operation of operations) {
      if (operation.type === 'UPDATE') {
        for (let i = operation.fromRowIndex; i < operation.toRowIndex; i++) {
          const value = updatedMaterial[i];
          const oldValue = material[i];
          let materialInfo = undefined;

          if (value.mat_code && value.mat_code !== oldValue.mat_code) {
            materialInfo = await getMaterialInfo(value.mat_code, plant, doc_date);
          } else if (value.short_text && value.short_text !== oldValue.short_text) {
            materialInfo = await getMaterialInfo(value.short_text, plant, doc_date);
          }

          if (materialInfo) {
            const { altUoms = [], valuations = [{}], materialGroups = [], purchasingGroups = [] } = materialInfo;
            const ord_unit = materialInfo.order_uom || materialInfo.base_uom;
            Object.assign(value, {
              alt_uom: altUoms,
              mat_code: materialInfo.mat_code,
              short_text: materialInfo.mat_desc,
              ord_unit: ord_unit,
              unit: materialInfo.base_uom,
              valuation_price: parseFloat(valuations[0]?.valuation_price || 0),
              price: null,
              currency: valuations[0]?.currency || 'PHP',
              per_unit: parseFloat(valuations[0]?.per_unit || '1'),
              mat_grp: materialGroups?.mat_grp_code || '',
              mat_grp_desc: materialGroups?.mat_grp_desc || '',
              purch_grp: purchasingGroups?.purch_grp || '',
              prctrl_grp_id: purchasingGroups?.prCtrlGrp?.id || prCtrlGrp[0]?.value || undefined,
              qty_ordered: null,
              item_text: null,
            });
          }

          // if (value.mat_code && value.mat_grp && materialGroupsSupplies.includes(value.mat_grp)) {
          //   value.unit = value.ord_unit;
          // }

          if ((value.qty && value.qty !== oldValue.qty) || (value.price && value.price > 0)) {
            if (value.mat_grp && materialGeneric.includes(value.mat_code)) {
              Object.assign(value, { ...computeConversion(value, value.ord_unit ?? '', true) });
            } else {
              Object.assign(value, { ...computeConversion(value, value.ord_unit ?? '') });
            }
          }
          value.item_no = (i + 1) * 10;
        }
      }
    }
    setIsLoading(false);
    return updatedMaterial;
  };

  return { getMaterialInfo, updateMaterialPR, computeConversion, isLoading };
}
