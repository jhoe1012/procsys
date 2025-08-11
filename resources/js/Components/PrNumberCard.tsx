import { useState } from 'react';
import { Modal, TabFields } from '@/Components';
import { Button, Textarea, Input, Label, Toaster, useToast } from '@/Components/ui/';
import { IPRHeader } from '@/types';
import TextInput from '@/Components/TextInput';
import { LetterText, Paperclip } from 'lucide-react';
import { ArrowUpTrayIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { formatLongDate, formatNumber, formatShortDate } from '@/lib/utils';
export default function PrNumberCard({
  rowData,
  rowIndex,
  handleOnChange,
  onCollectAttachments,
}: {
  rowData: any;
  rowIndex: number;
  handleOnChange: (value: string, rowIndex: number) => void;
  onCollectAttachments?: (attachments: { filename: string; path: string }[]) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [prDetails, setPrDetails] = useState<IPRHeader | null>(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const collectSelectedAttachmentPaths = () => {
    const prNumber = prDetails?.pr_number || rowData?.pr_number || rowData;
    // Remove duplicates by filename + path
    const uniqueFiles = Array.from(new Map(selectedFiles.map((file) => [`${file.filename}|${file.filepath}`, file])).values());
    const selected = uniqueFiles.map((file) => ({
      filename: file.filename,
      path: file.filepath,
      pr_number: prNumber,
    }));
    if (onCollectAttachments && selected.length > 0) {
      onCollectAttachments(selected);
      toast({
        description: `${selected.length} file${selected.length === 1 ? '' : 's'} added for extension.`,
        variant: 'default',
      });
      setShowModal(false);
    } else {
      setShowModal(false);
    }
    console.log('Selected attachments:', selected);
    return selected;
  };
  const fetchPrDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(route('pr.details', rowData));
      if (response.ok) {
        const data = await response.json();
        setPrDetails(data);
      } else {
        setPrDetails(rowData);
      }
    } catch (error) {
      setPrDetails(rowData);
    } finally {
      setLoading(false);
    }
  };

  const [selectedFiles, setSelectedFiles] = useState<{ filename: string; filepath: string }[]>([]);

  const isSelected = (file: { filename: string; filepath: string }) =>
    selectedFiles.some((f) => f.filename === file.filename && f.filepath === file.filepath);

  const toggleSelectFile = (file: { filename: string; filepath: string }) => {
    setSelectedFiles((prev) => {
      const exists = prev.some((f) => f.filename === file.filename && f.filepath === file.filepath);
      if (exists) {
        return prev.filter((f) => !(f.filename === file.filename && f.filepath === file.filepath));
      }
      // Only add if not already present
      return [...prev.filter((f) => !(f.filename === file.filename && f.filepath === file.filepath)), file];
    });
  };

  const handleOpenModal = () => {
    setShowModal(true);
    fetchPrDetails();
  };

  const tabs = [
    {
      value: 'reasonForPr',
      label: 'Reason for PR',
      tabIcon: <LetterText size={16} strokeWidth={1} className="text-black " />,
      visible: true,
      content: <Textarea value={prDetails?.reason_pr || ''} readOnly />,
    },
    {
      value: 'attachment',
      label: 'Attachment',
      tabIcon: <Paperclip size={16} strokeWidth={1} className="text-black " />,
      visible: true,
      content: (
        <>
          <ul
            className="mb-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3"
            style={{ minWidth: 500, maxWidth: 1200 }}>
            {prDetails?.attachments?.map((file) => (
              <li
                key={file.filename}
                className={`relative min-h-[3.5rem] p-2 rounded-md border shadow-sm flex items-center justify-between transition-all duration-150
        bg-white
       ${isSelected({ filename: file.filename, filepath: file.filepath }) ? 'ring-2 ring-blue-400 bg-blue-50' : ''}
      `}
                style={{ minWidth: 0, width: '100%' }}>
                <div
                  className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
                  style={{ alignItems: 'center' }}
                  onClick={() => toggleSelectFile({ filename: file.filename, filepath: file.filepath })}>
                  <span style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <CheckCircleIcon
                      className={`w-5 h-5 transition-colors ${isSelected({ filename: file.filename, filepath: file.filepath }) ? 'text-blue-500' : 'text-gray-300'}`}
                      style={{ verticalAlign: 'middle' }}
                    />
                  </span>
                  <span
                    className={`text-xs font-medium ${isSelected({ filename: file.filename, filepath: file.filepath }) ? 'text-blue-700 font-bold' : ''} break-all whitespace-normal w-full`}>
                    {file.filename}
                  </span>
                </div>
                <a
                  href={file.filepath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 px-2 py-1 text-[10px] text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
                  title="View attachment">
                  View
                </a>
              </li>
            ))}
          </ul>
          <div className="w-full mb-2">
            <button
              type="button"
              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs font-medium shadow"
              onClick={collectSelectedAttachmentPaths}
              style={{ minWidth: 140 }}>
              Extend Attachments
            </button>
          </div>
        </>
      ),
    },
  ];

  const handleCloseModal = () => {
    // setSelectedFiles([]);
    collectSelectedAttachmentPaths();
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="w-full h-full text-dark underline text-lg  cursor-pointer p-0 m-0  "
        aria-label="Show PR Details"
        style={{ minWidth: 0, minHeight: 0 }}>
        {typeof rowData === 'object' ? rowData.pr_number : rowData}
      </button>
      <Modal show={showModal} onClose={handleCloseModal} maxWidth="3xl">
        {loading ? (
          <div className="bg-white p-6 rounded shadow-md w-full flex items-center justify-center">
            <span className="text-gray-500 text-sm">Loading PR details...</span>
          </div>
        ) : prDetails ? (
          <div className="bg-white p-6 rounded shadow-md w-full">
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold mb-1">PR Number</label>
                <input type="text" className="w-full border rounded px-2 py-1 text-xs" value={prDetails.pr_number || ''} readOnly />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Created By</label>
                <input type="text" className="w-full border rounded px-2 py-1 text-xs" value={prDetails.created_name || ''} readOnly />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Doc Date</label>
                <input type="text" className="w-full border rounded px-2 py-1 text-xs" value={prDetails.doc_date || ''} readOnly />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Requested By</label>
                <input type="text" className="w-full border rounded px-2 py-1 text-xs" value={prDetails.requested_by || ''} readOnly />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Requesting Plant</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1 text-xs"
                  value={prDetails.plant || (Array.isArray(prDetails.plants) ? prDetails.plants[0]?.plant : '') || ''}
                  readOnly
                />
              </div>
            </div>
            <div className="p-1 pt-0">
              <div className="w-[600px] max-w-full">
                <TabFields defaultValue="reasonForPr" className="max-w-8xl" tabs={tabs} />
              </div>
            </div>
            {/* PR Material Table */}
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                  <tr className="text-nowrap" style={{ position: 'sticky', top: 0, zIndex: 2, background: '#f9fafb' }}>
                    <th className="px-3 py-2">Stat </th>
                    <th className="px-3 py-2">itemNo</th>
                    <th className="px-3 py-2">Material</th>
                    <th className="px-3 py-2">Material Description</th>
                    <th className="px-3 py-2">Item Text </th>
                    <th className="px-3 py-2">Del Date</th>
                    <th className="px-3 py-2">Quantity</th>
                    <th className="px-3 py-2">Open Qty</th>
                    <th className="px-3 py-2">Ord. Unit</th>
                    <th className="px-3 py-2">Total Value</th>
                    <th className="px-3 py-2">Curr</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-black  ">
                  {prDetails &&
                    prDetails.prmaterials.map((prmaterial: any) => (
                      <tr className="bg-white border-b" key={prmaterial.id}>
                        <td className="px-3 py-2">{prmaterial.status}</td>
                        <td className="px-3 py-2">{prmaterial.item_no}</td>
                        <td className="px-3 py-2">{prmaterial.mat_code}</td>
                        <td className="px-3 py-2">{prmaterial.short_text}</td>
                        <td className="px-3 py-2">{prmaterial.item_text}</td>
                        <td className="px-3 py-2">{formatShortDate(String(prmaterial.del_date))}</td>
                        <td className="px-3 py-2">{prmaterial.qty}</td>
                        <td className="px-3 py-2">{prmaterial.qty_open}</td>
                        <td className="px-3 py-2">{prmaterial.ord_unit}</td>
                        <td className="px-3 py-2">{formatNumber(prmaterial.total_value ?? 0)}</td>
                        <td className="px-3 py-2">{prmaterial.currency}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
