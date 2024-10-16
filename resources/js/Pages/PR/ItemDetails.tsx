import { useState } from 'react';
import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  intColumn,
  keyColumn,
  floatColumn,
  dateColumn,
} from 'react-datasheet-grid';

type IPRItemDetails = {
  document?: number;
  item?: number;
  stat?: string;
  qty?: number;
  unit?: string;
};

export default function ItemDetails({item_details}) {
  const [data, setData] = useState<IPRItemDetails[]>(item_details);

  const columns = [
    { ...keyColumn('doc', textColumn), title: 'Document', disabled: true },
    { ...keyColumn('itm', textColumn), title: 'Item', disabled: true },
    { ...keyColumn('sts', textColumn), title: 'Status', disabled: true },
    { ...keyColumn('qty', textColumn), title: 'Quantity', disabled: true },
    { ...keyColumn('unit', textColumn), title: 'Unit', disabled: true },
  ];

  const customStyle = {
    '--dsg-header-text-color': 'rgb(10, 10, 10)',
    '--dsg-cell-disabled-background-color': 'rgb(245, 245, 245)',
    '--dsg-border-color': '#bfbdbd',
  };

  return (
    <DataSheetGrid
      value={data}
      onChange={setData}
      columns={columns}
      style={customStyle}
      disableContextMenu
      lockRows
      rowHeight={30}
      className="text-sm"
    />
  );
}
