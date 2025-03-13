import { useState } from 'react';
import { Modal } from '@/Components';
import { Square2StackIcon } from '@heroicons/react/24/solid';
import { IAlternativeUom } from '@/types';

export default function AltUom({
  rowData,
  rowIndex,
  handleOnChange,
}: {
  rowData: IAlternativeUom[];
  rowIndex: number;
  handleOnChange: (value: string, rowIndex: number) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Square2StackIcon onClick={() => setShowModal(true)} className="h-5 w-5  cursor-pointer text-blue-500" />

      <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="lg">
        <div className="p-1">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th colSpan={3} className="border border-gray-300 p-2">
                  Alternative Unit of Measure
                </th>
              </tr>
              <tr>
                <th className="border border-gray-300 p-2">Unit</th>
                <th className="border border-gray-300 p-2">Unit Text</th>
                <th className="border border-gray-300 p-2">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((altUom, index) => (
                <tr
                  key={index}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    handleOnChange(altUom.alt_uom, rowIndex);
                    setShowModal(false);
                  }}>
                  <td className="border border-gray-300 p-2 text-center">{altUom.alt_uom}</td>
                  <td className="border border-gray-300 p-2">{altUom.altUomText?.uom_text || ''}</td>
                  <td className="border border-gray-300 p-2 text-center">{altUom.counter / altUom.denominator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
}
