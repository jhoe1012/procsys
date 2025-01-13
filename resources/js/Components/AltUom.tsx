import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { SecondaryButton, Modal } from '@/Components';
import { Button } from '@/Components/ui';
import { Square2StackIcon } from '@heroicons/react/24/solid';

export default function AltUom({
  rowData,
  rowIndex,
  handleOnChange,
}: {
  rowData: any;
  rowIndex: number;
  handleOnChange: (value: string, rowIndex: number) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Square2StackIcon onClick={() => setShowModal(true)} className="h-5 w-5  cursor-pointer text-blue-500" />

      <Modal show={showModal} onClose={closeModal} maxWidth="lg">
        <div className="p-5">
          <h1 className="font-medium mb-2">Alternative UOM</h1>
          <select
            className="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              handleOnChange(e.target.value, rowIndex);
              setShowModal(false);
            }}>
            <option> Select UOM</option>
            {rowData.map((item: string[], index: number) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </Modal>
    </>
  );
}
