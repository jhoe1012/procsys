import { useState } from 'react';
import { Modal } from '@/Components';
import { Square2StackIcon } from '@heroicons/react/24/solid';
import { IAlternativeUom } from '@/types';
import TextInput from '@/Components/TextInput';
import { SquarePen } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = rowData.filter((item) =>
    Object.entries(item).some(([key, val]) => {
      if (typeof val === 'object' && val !== null) {
        return Object.values(val).some((nestedVal) => String(nestedVal).toLowerCase().includes(searchQuery.toLowerCase()));
      }
      return String(val).toLowerCase().includes(searchQuery.toLowerCase());
    })
  );

  return (
    <>
      {/* <Square2StackIcon
        onClick={() => setShowModal(true)}
        className="h-5 w-5 cursor-pointer text-blue-500"
        aria-label="Open Alternative Unit of Measure Modal"
      />  */}

      <SquarePen  onClick={() => setShowModal(true)}
        className="h-5 w-5 cursor-pointer text-blue-500"
        aria-label="Open Alternative Unit of Measure Modal"/>

      <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="lg">
        <div className="border border-gray-300 max-h-[90vh] p-1 overflow-hidden flex flex-col">
          <table className="w-full border-collapse table-fixed">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th colSpan={3} className="border border-gray-300 p-2">
                  Alternative Unit of Measure
                </th>
              </tr>
              <tr>
                <th colSpan={3} className="border border-gray-300 p-2">
                  <TextInput
                    type="text"
                    placeholder="Search here"
                    className="w-full p-1 border border-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </th>
              </tr>
              <tr>
                <th className="border border-gray-300 p-2 p-w-5">Unit</th>
                <th className="border border-gray-300 p-2">Unit Text</th>
                <th className="border border-gray-300 p-2">Conversion</th>
              </tr>
            </thead>
          </table>
          <div className="overflow-y-auto min-h-[50vh]">
            <table className="w-full border-collapse table-fixed">
              <tbody>
                {filteredData.map((altUom, index) => (
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
        </div>
      </Modal>
    </>
  );
}
