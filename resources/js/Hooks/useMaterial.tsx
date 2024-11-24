import { IAlternativeUom, IPRMaterial } from '@/types';
import { useState } from 'react';
import { Operation } from 'react-datasheet-grid/dist/types';

const materialCache: { [key: string]: any } = {}; // Cache for getMaterialInfo results

export default function useMaterial() {
  const [isLoading, setIsLoading] = useState(false);

  const getMaterialInfo = async (material: string, plant: string) => {
    try {
      const { data } = await window.axios.get(route('material.details'), {
        params: { material: material, plant: plant },
      });
      return data?.data;
    } catch (error) {
      console.error(`Error fetching material info for "${material}":`, error);
      return null;
    }
  };

  const computeConversion = (material: IPRMaterial, _ord_unit: string) => {
    const alt_uom = material.altUom?.find(({ alt_uom }) => alt_uom === _ord_unit) || {};
    const conversion = (alt_uom.counter ?? 1) / (alt_uom.denominator ?? 1);
    const price = material.valuation_price * conversion;
    const converted_qty = (material.qty ?? 0) * conversion;
    const total_value = ((price ?? 0) / (material.per_unit ?? 0)) * (material.qty ?? 0);
    const ord_unit = _ord_unit;

    return { conversion, price, converted_qty, total_value, ord_unit };
  };

  const updateMaterialPR = async (
    newValue: IPRMaterial[],
    operations: Operation[],
    material: IPRMaterial[],
    plant: string
  ): Promise<IPRMaterial[]> => {
    const updatedMaterial = [...newValue];
    setIsLoading(true);

    for (const operation of operations) {
      if (operation.type === 'UPDATE') {
        for (let i = operation.fromRowIndex; i < operation.toRowIndex; i++) {
          const value = updatedMaterial[i];
          const oldValue = material[i];

          const fetchMaterialInfo = async (key: string) => {
            if (!materialCache[key]) {
              materialCache[key] = await getMaterialInfo(key, plant);
            }
            return materialCache[key];
          };

          // if (value.mat_code && value.mat_code !== oldValue.mat_code) {
          //   const materialInfo = await fetchMaterialInfo(value.mat_code);
          //   if (materialInfo) {
          //     const { valuations = [{}], materialGroups = [{}], purchasingGroups = [{}] } = materialInfo;

          //     Object.assign(value, {
          //       short_text: materialInfo.mat_desc,
          //       ord_unit: materialInfo.base_uom,
          //       unit: materialInfo.base_uom,
          //       valuation_price: parseFloat(valuations[0]?.valuation_price || '0'),
          //       currency: valuations[0]?.currency || '',
          //       per_unit: parseFloat(valuations[0]?.per_unit || '0'),
          //       mat_grp: materialGroups[0]?.mat_grp_code || '',
          //       purch_grp: purchasingGroups[0]?.purch_grp || '',
          //     });
          //   }
          // }

          if (
            (value.mat_code && value.mat_code !== oldValue.mat_code) ||
            (value.short_text && value.short_text !== oldValue.short_text)
          ) {
            const materialInfo = await fetchMaterialInfo(value.short_text ?? value.mat_code);
            if (materialInfo) {
              const { altUoms = [], valuations = [{}], materialGroups = [{}], purchasingGroups = [{}] } = materialInfo;
              const ord_unit = materialInfo.order_uom || materialInfo.base_uom;
              const altUomSelect = [...new Set([ord_unit, ...altUoms.map((item: IAlternativeUom) => item.alt_uom)])];

              Object.assign(value, {
                altUomSelect,
                altUom: altUoms,
                mat_code: materialInfo.mat_code,
                short_text: materialInfo.mat_desc,
                ord_unit: ord_unit,
                unit: materialInfo.base_uom,
                valuation_price: parseFloat(valuations[0]?.valuation_price || '0'),
                currency: valuations[0]?.currency || '',
                per_unit: parseFloat(valuations[0]?.per_unit || '0'),
                mat_grp: materialGroups[0]?.mat_grp_code || '',
                purch_grp: purchasingGroups[0]?.purch_grp || '',
              });
            }
          }

          if (value.qty && value.qty !== oldValue.qty) {
            Object.assign(value, { ...computeConversion(value, value.ord_unit ?? '') });
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
