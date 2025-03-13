import { IAlternativeUom, IPRMaterial } from '@/types';
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

  // const getMaterialInfo = async (material: string, plant: string, doc_date: string) => {
  //   try {
  //     const { data } = await window.axios.get(route('material.details'), {
  //       params: { material: material, plant: plant, doc_date: doc_date },
  //     });
  //     return data?.data;
  //   } catch (error) {
  //     console.error(`Error fetching material info for "${material}":`, error);
  //     return null;
  //   }
  // };

  const computeConversion = (material: IPRMaterial, ord_unit: string) => {
    const altUom = material.alt_uom?.find(({ alt_uom }) => alt_uom === ord_unit) || {};
    const conversion = (altUom.counter ?? 1) / (altUom.denominator ?? 1);
    const price = material.valuation_price * conversion;
    const converted_qty = (material.qty ?? 0) * conversion;
    const total_value = ((price ?? 0) / (material.per_unit ?? 0)) * (material.qty ?? 0);

    return { conversion, price, converted_qty, total_value, ord_unit };
  };

  // const fetchMaterialInfo = async (key: string, plant: string, doc_date: string) => {
  //   if (!materialCache[key]) {
  //     materialCache[key] = await getMaterialInfo(key, plant, doc_date);
  //   }
  //   return materialCache[key];
  // };

  const updateMaterialPR = async (
    newValue: IPRMaterial[],
    operations: Operation[],
    material: IPRMaterial[],
    plant: string,
    doc_date: string,
    materialGroupsSupplies: string[]
  ): Promise<IPRMaterial[]> => {
    const updatedMaterial = [...newValue];
    setIsLoading(true);

    for (const operation of operations) {
      if (operation.type === 'UPDATE') {
        for (let i = operation.fromRowIndex; i < operation.toRowIndex; i++) {
          const value = updatedMaterial[i];
          const oldValue = material[i];

          if ((value.mat_code && value.mat_code !== oldValue.mat_code) || (value.short_text && value.short_text !== oldValue.short_text)) {
            // const materialInfo = await fetchMaterialInfo(value.short_text ?? value.mat_code, plant, doc_date);
            const materialInfo = await getMaterialInfo(value.short_text ?? value.mat_code ?? '', plant, doc_date);
            if (materialInfo) {
              const { altUoms = [], valuations = [{}], materialGroups = [], purchasingGroups = [] } = materialInfo;
              const ord_unit = materialInfo.order_uom || materialInfo.base_uom;
              Object.assign(value, {
                alt_uom: altUoms,
                mat_code: materialInfo.mat_code,
                short_text: materialInfo.mat_desc,
                ord_unit: ord_unit,
                unit: materialInfo.base_uom,
                valuation_price: parseFloat(valuations[0]?.valuation_price || '0'),
                currency: valuations[0]?.currency || 'PHP',
                per_unit: parseFloat(valuations[0]?.per_unit || '1'),
                mat_grp: materialGroups?.mat_grp_code || '',
                mat_grp_desc: materialGroups?.mat_grp_desc || '',
                purch_grp: purchasingGroups?.purch_grp || '',
                qty_ordered: null,
                item_text: null,
              });
            }
          }
          if (value.mat_code && value.mat_grp && materialGroupsSupplies.includes(value.mat_grp)) {
            value.unit = value.ord_unit;
          }

          if ((value.qty && value.qty !== oldValue.qty) || (value.price && value.price > 0)) {
            if (value.mat_grp && materialGroupsSupplies.includes(value.mat_grp)) {
              const suppliesMaterial = {
                price: value.price ?? value.valuation_price,
                total_value: value.qty * ((value.price ?? value.valuation_price) / value.per_unit) || 0,
                conversion: 1,
                converted_qty: value.qty,
              };
              Object.assign(value, { ...suppliesMaterial });
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
