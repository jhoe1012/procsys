import { useState } from 'react';
import { Button } from '@/Components/ui';
import { Modal } from '@/Components';

interface Column {
  key: string;
  header: string;
}

interface AttributeDetailsProps {
  columns: Column[];
  data: Record<string, any>[];
  label: string;
}

export default function AttributeDetails({ columns, data, label }: AttributeDetailsProps) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={`space-y-6`}>
      {label && (
        <Button onClick={() => setShowModal(true)} variant="outline" size="sm" className="text-xs font-normal">
          {label}
        </Button>
      )}

      <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
        <div className="overflow-x-auto rounded-lg shadow max-h-[90vh]">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-2 text-left font-medium text-gray-700">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                    No data available.
                  </td>
                </tr>
              ) : (
                data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 cursor-pointer">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-2 border-t">
                        {row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Modal>
    </section>
  );
}
