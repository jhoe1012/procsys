import { useState } from 'react';
import {
  DataSheetGrid, textColumn,
  intColumn,
  keyColumn,
  floatColumn
} from 'react-datasheet-grid';

type IPRItemDetails = {
  document?: number;
  item?: number;
  stat?: string;
  qty?: number;
  unit?: string;
};

export default function ItemDetails() {
  const [data, setData] = useState<IPRItemDetails[]>([
    {
      document: undefined,
      item: undefined,
      stat: undefined,
      qty: undefined,
      unit: undefined,
    },
    {
      document: undefined,
      item: undefined,
      stat: undefined,
      qty: undefined,
      unit: undefined,
    },
    {
      document: undefined,
      item: undefined,
      stat: undefined,
      qty: undefined,
      unit: undefined,
    },
  ]);

  const columns = [
    { ...keyColumn('document', textColumn), title: 'Document', disabled: true },
    { ...keyColumn('item', intColumn), title: 'Item', disabled: true },
    { ...keyColumn('stat', textColumn), title: 'Status', disabled: true },
    { ...keyColumn('qty', floatColumn), title: 'Quantity', disabled: true },
    { ...keyColumn('unit', textColumn), title: 'Unit', disabled: true },
  ];

  const customStyle = {
    '--dsg-header-text-color': 'rgb(10, 10, 10)',
    // "--dsg-selection-disabled-background-color": "rgba(177, 206, 252)",
    '--dsg-cell-disabled-background-color': 'rgb(230, 230, 230)',
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
