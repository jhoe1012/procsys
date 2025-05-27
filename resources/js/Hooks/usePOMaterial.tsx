import { IPOMaterial, IVendor } from '@/types';
import { Operation } from 'react-datasheet-grid/dist/types';

export default function usePOMaterial() {
  const computeConversion = (material: IPOMaterial, ord_unit: string, vendor: string = '', is_update = false) => {
    let qty_open_po = material.qty_open;
    let per_unit = material.per_unit;
    let net_price = 0,
      total_value = 0,
      min_order_qty = 0,
      converted_qty_po = 0,
      conversion_po = 1;
    // let po_qty = material.po_qty ?? material.qty_open;
    // get net price based on vendor and uom
    const materialNetPriceUomVendor = material.materialNetPrices.find(
      (netp_item) => netp_item.uom === ord_unit && netp_item.vendor === vendor
    );
    // get net price based on uom
    const materialNetPriceUom = material.materialNetPrices.find((netp_item) => netp_item.uom === ord_unit);

    // set conversion based on selected uom
    const altUom = material.alt_uom?.find((uom) => uom.alt_uom === ord_unit);
    conversion_po = (altUom?.counter ?? 1) / (altUom?.denominator ?? 1);

    qty_open_po = (material.qty_open ?? 0) * (material.conversion ?? 0);
    qty_open_po = qty_open_po / conversion_po;

    // set po quantity to qty open po when changing uom
    let po_qty = is_update ? material.po_qty : qty_open_po || material.po_qty;
    converted_qty_po = (po_qty ?? 0) * conversion_po;

    // set net price based on material top 1 net price maintained in DB
    const firstNetPrice = material.materialNetPrices[0] ?? 0;
    const netPriceAltUom = material.alt_uom?.find((uom) => uom.alt_uom === firstNetPrice?.uom);
    let materialNetPriceUomFirst = firstNetPrice.price / ((netPriceAltUom?.counter ?? 1) / (netPriceAltUom?.denominator ?? 1));
    materialNetPriceUomFirst = materialNetPriceUomFirst * conversion_po;

    if (materialNetPriceUomVendor) {
      net_price = materialNetPriceUomVendor.price;
      min_order_qty = materialNetPriceUomVendor.min_order_qty;
    } else if (materialNetPriceUom) {
      net_price = materialNetPriceUom.price;
      min_order_qty = materialNetPriceUom.min_order_qty;
    } else if (materialNetPriceUomFirst) {
      net_price = materialNetPriceUomFirst;
    } else {
      net_price = material.net_price ?? material.price;
    }

    // set net price based on DB net price
    net_price = is_update ? material.net_price : net_price;
    total_value = ((net_price ?? 0) / (per_unit ?? 0)) * (po_qty ?? 0);

    return { conversion_po, ord_unit, net_price, converted_qty_po, total_value, min_order_qty, qty_open_po, unit: ord_unit, po_qty };
  };
  const updateMaterialPO = (newValue: IPOMaterial[], operations: Operation[], material: IPOMaterial[], is_edit: boolean = false) => {
    const updatedMaterial = [...newValue];
    for (const operation of operations) {
      if (operation.type === 'UPDATE') {
        for (let i = operation.fromRowIndex; i < operation.toRowIndex; i++) {
          const value = updatedMaterial[i];
          const oldValue = material[i];

          let { total_value, net_price } = computeConversion(value, value.unit ?? '');


          value.po_qty =
            value.min_order_qty && value.min_order_qty > 0 && (value.po_qty ?? 0) < value.min_order_qty
              ? value.min_order_qty
              : (value.po_qty ?? 0);

          const pastedQty = value.po_qty;
          const pastedNetPrice = value.net_price ?? 0;

          if (is_edit) {
            const _openPOWithOrigPO = (value.qty_open_po ?? 0) + (value.origPOQty ?? 0);
            value.po_qty = Math.min(pastedQty, _openPOWithOrigPO);
            // Set po_gr_qty equal to po_qty to prevent the field from being disabled during editing.
            value.po_gr_qty = value.po_qty;
            value.net_price = value.item_free ? 0 : pastedNetPrice;
          } else {
            value.po_qty = Math.min(pastedQty, value.qty_open_po ?? 0);
            value.net_price = value.item_free ? 0 : pastedNetPrice;
          }

          // Apply min_order_qty constraint after all adjustments
          if (value.min_order_qty && value.min_order_qty > 0) {
            value.po_qty = Math.max(value.po_qty, value.min_order_qty);
          }

          // Ensure total_value is recalculated only when necessary
          if (oldValue.net_price !== value.net_price || oldValue.po_qty !== value.po_qty || oldValue.per_unit !== value.per_unit) {
            net_price = value.net_price ?? oldValue.net_price ?? 0;
            total_value = ((net_price ?? 0) / (value.per_unit ?? 1)) * (value.po_qty ?? oldValue.po_qty ?? 0);
          } else {
            total_value = oldValue.total_value ?? 0; // Retain the previous total_value if no changes
          }

          value.item_no = (operation.fromRowIndex + 1) * 10;
          value.total_value = value.item_free ? 0 : total_value;
          value.converted_qty_po = (value?.po_qty ?? 0) * (value?.conversion_po ?? 0);
        }
      }
    }
    return updatedMaterial;
  };

  const getVendorInfo = async (vendorId: number) => {
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
