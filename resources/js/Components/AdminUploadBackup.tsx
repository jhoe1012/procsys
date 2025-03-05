import { useState, FormEventHandler, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Dropzone from './Dropzone';
import { Button, useToast } from './ui';
import Modal from './Modal';

export default function AdminUpload({ url }: { url: string }) {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [files, setFiles] = useState([]);
  const { data, setData, post, processing, reset, errors } = useForm({
    file: files,
  });
  const { toast } = useToast();

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
      onSuccess: () => {
        setShowSuccess(true);
        closeModal();
      },
      onFinish: () => closeModal(),
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
      <Modal show={showSuccess} onClose={closeSuccessModal} maxWidth="md">
        <div className="flex flex-col p-5">
          <h1 className="font-bold border-b-2 mb-2 p-1">Import Prices</h1>
          <div className="flex flex-col text-center p-2">
            <p>Processing complete</p>
            <p>
              Please check
              <a href={route('val_price.download.error')} target="_blank" className="text-blue-500 p-2 underline">
                IMPORT ERROR LOG.xlsx
              </a>
              for errors.
            </p>
          </div>
        </div>
      </Modal>

      <Button onClick={() => setShowModal(true)}>Upload Price</Button>
      {/* Modal Upload */}
      <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
        <form onSubmit={handleSubmit}>
          <div className=" p-5 w-full">
            <h3 className="mb-5 font-semibold text-lg">Upload Valuation Price</h3>
            <Dropzone files={files} setFiles={setFiles} multiple={false} />
          </div>
          <div className="grid justify-items-center m-3">
            <Button
              variant="outline"
              disabled={processing || files.length === 0}
              className="bg-[#f8c110] hover:border-gray-500 hover:bg-[#f8c110] w-40 mb-2">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}


