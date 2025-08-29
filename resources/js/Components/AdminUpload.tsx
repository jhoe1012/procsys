import { useState, FormEventHandler, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Dropzone from './Dropzone';
import { Button, useToast } from './ui';
import Modal from './Modal';
import { IMessage } from '@/types';

export default function AdminUpload({ url, pageName }: { url: string; pageName: string }) {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [files, setFiles] = useState([]);
  const { data, setData, post, processing, reset, errors } = useForm({
    file: files,
  });
  const { toast } = useToast();

  const { message } = usePage().props;

  useEffect(() => {
    if (errors.hasOwnProperty('error')) {
      toast({
        variant: 'destructive',
        description: errors.error,
      });
    }
  }, [errors]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(url, {
      preserveScroll: true,
      onSuccess: (page) => {
        setShowSuccess(true);
        closeModal();
      },
      onFinish: () => {
        closeModal();
      },
    });
  };

  useEffect(() => {
    setData('file', files);
  }, [files]);

  const closeModal = () => {
    setShowModal(false);
    reset();
    setFiles([]);
  };

  const closeSuccessModal = () => setShowSuccess(false);

  return (
    <section className={`space-y-6`}>
      {/* Modal for Success message */}
      <Modal show={showSuccess} onClose={closeSuccessModal} maxWidth="2xl">
        <div className="flex flex-col p-5">
          <h1 className="font-bold border-b-2 mb-2 p-1">Import {pageName} </h1>
          <div className="flex flex-col text-center p-2">
            <p>Processing complete</p>
            {pageName == 'Valuation Price List' && (
              <p>
                Please check
                <a href={route('val_price.download.error')} target="_blank" rel="noopener"  className="text-blue-500 p-2 underline">
                  IMPORT ERROR LOG.xlsx
                </a>
                for errors.
              </p>
            )}
          </div>
          {/* Display errors if any */}
          {message.missing && message.missing.length > 0 && pageName !== 'Valuation Price List' && (
            <>
              <div className="flex flex-col p-2 mt-3">
                <h1 className="font-semibold text-sm border-b text-red-600 border-gray-300 mb-2 p-1">
                  Error Logs: (Some details are not uploaded)
                </h1>
                <div className="overflow-x-auto max-h-60">
                  <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-red-100 text-red-700">
                      <tr>
                        <th className="border border-gray-300 px-2 py-1">Error Type</th>
                        {pageName === 'Vendor' && <th className="border border-gray-300 px-2 py-1">Sheet Name</th>}
                        <th className="border border-gray-300 px-2 py-1">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {message.missing &&
                        message.missing.map((errorDetails, index) => (
                          <tr key={index} className="bg-white text-center">
                            <td className="border border-gray-300 px-2 py-2 font-semibold">Incomplete Details</td>
                            {pageName === 'Vendor' && (
                              <td className="border border-gray-300 px-2 py-2 font-semibold">{errorDetails.sheet}</td>
                            )}
                            <td className="border border-gray-300 px-2 py-2 text-sm font-bold text-red-600">
                              <span className="inline-flex items-center bg-gray-200 text-red-600  font-semibold px-2 py-2 rounded-md">
                                {pageName === 'Vendor' && errorDetails.row_id ? `Row: ${errorDetails.row_id}` : `Row: ${errorDetails}`}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-center mt-4">
            <button
              onClick={closeSuccessModal}
              className="px-4 py-2 bg-yellow-500 font-medium text-black rounded-lg shadow-md hover:bg-yellow-600 transition duration-200">
              Close
            </button>
          </div>
        </div>
      </Modal>

      <Button onClick={() => setShowModal(true)}>Upload {pageName}</Button>
      {/* Modal Upload */}
      <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
        <form onSubmit={handleSubmit} className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h3 className="font-semibold text-lg">{`Upload ${pageName}`}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">Supported file types:</span>
              <div className="flex gap-1">
                <span className="px-2 py-0.5 text-xs font-semibold text-white bg-green-500 rounded-md">XLSX</span>
                <span className="px-2 py-0.5 text-xs font-semibold text-white bg-green-500 rounded-md">CSV</span>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <Dropzone files={files} setFiles={setFiles} multiple={false} />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              disabled={processing || files.length === 0}
              className="w-40 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-lg shadow-sm transition">
              {processing ? 'Processing...' : 'Save'}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
