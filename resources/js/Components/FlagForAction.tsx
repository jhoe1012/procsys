import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { SecondaryButton, Modal } from '@/Components';
import { Button } from '@/Components/ui';

export default function FlagForAction({
  p_title,
  p_description,
  p_url,
  p_disable = false,
  p_items,
}: {
  p_id?: number;
  p_title: string;
  p_description: string;
  p_url: string;
  p_disable?: boolean;
  p_items: any;
}) {
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  const confirmUserDiscard = () => {
    setConfirmDiscard(true);
  };

  const closeModal = () => {
    setConfirmDiscard(false);
  };

  return (
    <>
      <Button
        onClick={confirmUserDiscard}
        variant="outline"
        type="button"
        disabled={p_disable}
        className="m-3 p-2 disabled:opacity-100 disabled:bg-gray-100 disabled:cursor-not-allowed">
        {p_title}
      </Button>

      <Modal show={confirmDiscard} onClose={closeModal} maxWidth="3xl">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">{p_description}</h2>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal} className="mx-5">
              No
            </SecondaryButton>

            <Link
              href={p_url}
              data={p_items}
              preserveScroll
              as="button"
              type="button"
              className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
              Yes
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
