import { useState, FormEventHandler } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { STATUS_APPROVED } from '@/lib/constants';

export default function Approval({
  p_pr_number = '',
  p_type = '',
  p_title = '',
  p_disable = false,
}: {
  p_pr_number?: string;
  p_type?: string;
  p_title?: string;
  p_disable: boolean;
}) {
  const [confirmApproval, setConfirmApproval] = useState(false);

  const { data, setData, post, processing, reset, errors } = useForm({
    pr_number: p_pr_number,
    type: p_type,
    message: '',
  });

  const confirmuserApproval = () => {
    setConfirmApproval(true);
  };

  const approvePr: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('pr.approve'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
    });
  };

  const closeModal = () => {
    setConfirmApproval(false);
  };

  const stylesMap: Record<string, string> = {
    Approved: 'bg-green-500 hover:bg-green-600',
    Rejected: 'bg-red-500 hover:bg-red-600',
    Rework: '',
  };

  const styles = stylesMap[p_type] || '';

  return (
    <>
      <Button
        onClick={confirmuserApproval}
        variant="outline"
        className={styles + ' px-11 mx-3 disabled:opacity-100 disabled:bg-gray-100 '}
        disabled={p_disable}>
        {p_title.toUpperCase()}
      </Button>

      <Modal show={confirmApproval} onClose={closeModal}>
        <form onSubmit={approvePr} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to {p_title} this Purchase Requisition ?
          </h2>
          {p_type != STATUS_APPROVED ? (
            <Textarea
              placeholder="message"
              value={data.message}
              onChange={(e) => setData('message', e.target.value)}
              required={true}
            />
          ) : (
            ''
          )}

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            <PrimaryButton className="ms-3" disabled={processing}>
              {p_title.toUpperCase()}
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
