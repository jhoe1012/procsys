import React from 'react';
import { Link } from '@inertiajs/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface Attachment {
  id: number;
  filename: string;
  filepath: string;
}

interface AttachmentListProps {
  attachments: Attachment[] | undefined; // List of attachments
  canDelete: boolean; // Permission to edit attachments
}

const AttachmentList: React.FC<AttachmentListProps> = ({ attachments, canDelete }) => {
  return (
    <ul className="mt-3 mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {attachments &&
        attachments.map((attachment) => (
          <li key={attachment.id} className="relative h-12 rounded-md shadow-lg p-2 bg-white">
            {canDelete && (
              <Link
                preserveScroll
                href={route('attachment.delete', attachment.id)}
                method="delete"
                as="button"
                className="w-7 h-7  bg-slate-100 rounded-full flex justify-center items-center absolute top-3 right-2 hover:bg-red-200 transition-colors">
                <XMarkIcon className="w-6 h-6  text-red-600 hover:fill-red-700 transition-colors" />
              </Link>
            )}
            <p className="mt-2 text-blue-600 text-sm font-medium truncate pr-7">
              <a href={`/${attachment.filepath}`} download={true}>
                {attachment.filename}
              </a>
            </p>
          </li>
        ))}
    </ul>
  );
};

export default AttachmentList;
