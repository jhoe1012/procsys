import { IPOMaterial } from '@/types';
import { Operation } from 'react-datasheet-grid/dist/types';

export default function usePOMaterial() {
  const computeConversion = (material: IPOMaterial, _ord_unit: string, vendor: string = '') => {
    const ord_unit = _ord_unit;
    let unit = _ord_unit,
      qty_open_po = material.qty_open;
    let per_unit = material.per_unit;
    let net_price = 0,
      total_value = 0,
      min_order_qty = 0,
      converted_qty_po = 0,
      conversion_po = 1;
    let po_qty = material.po_qty ?? material.qty_open;
    const materialNetPriceUomVendor = material.materialNetPrices.find((netp_item) => netp_item.uom === unit && netp_item.vendor === vendor);
    const materialNetPriceUom = material.materialNetPrices.find((netp_item) => netp_item.uom === unit);
    const altUom = material.alt_uom?.find((uom) => uom.alt_uom === unit);

    conversion_po = (altUom?.counter ?? 1) / (altUom?.denominator ?? 1);
    converted_qty_po = (po_qty ?? 0) * conversion_po;
    qty_open_po = (material.qty_open ?? 0) * (material.conversion ?? 0);
    qty_open_po = qty_open_po / conversion_po;

    if (materialNetPriceUomVendor) {
      net_price = materialNetPriceUomVendor.price;
      min_order_qty = materialNetPriceUomVendor.min_order_qty;
      total_value = ((net_price ?? 0) / (per_unit ?? 0)) * (po_qty ?? 0);
    } else if (materialNetPriceUom) {
      net_price = materialNetPriceUom.price;
      min_order_qty = materialNetPriceUom.min_order_qty;
      total_value = ((net_price ?? 0) / (per_unit ?? 0)) * (po_qty ?? 0);
    } else {
      net_price = material.net_price ?? material.price;
      total_value = ((net_price ?? 0) / (per_unit ?? 0)) * (po_qty ?? 0);
    }

    return { conversion_po, ord_unit, net_price, converted_qty_po, total_value, min_order_qty, qty_open_po, unit, po_qty };
  };

  const updateMaterialPO = (newValue: IPOMaterial[], operations: Operation[], is_edit: boolean = false) => {
    const updatedMaterial = [...newValue];
    for (const operation of operations) {
      if (operation.type === 'UPDATE') {
        for (let i = operation.fromRowIndex; i < operation.toRowIndex; i++) {
          const value = updatedMaterial[i];
          const { converted_qty_po, total_value } = computeConversion(value, value.unit ?? '');

          value.net_price = value.item_free ? 0 : value.net_price;
          value.item_no = (operation.fromRowIndex + 1) * 10;
          value.po_qty = value.po_qty < value.min_order_qty ? value.min_order_qty : value.po_qty;

          if (is_edit) {
            const _openPOWithOrigPO = value.qty_open_po + value.origPOQty;
            value.po_qty = value.po_qty > _openPOWithOrigPO ? _openPOWithOrigPO : value.po_qty;
          } else {
            value.po_qty = value.po_qty > value.qty_open_po ? value.qty_open_po : value.po_qty;
          }

          value.converted_qty_po = converted_qty_po;
          value.total_value = total_value;
        }
      }
    }

    return updatedMaterial;
  };

  const getVendorInfo = async (vendorId) => {
    try {
      const response = await window.axios.get(route('po.vendor', vendorId));
      return response.data.data;
    } catch (error) {
      console.log('Error fetching vendor info: ', error);
      return undefined;
    }
  };

  return { computeConversion, updateMaterialPO, getVendorInfo };
}
