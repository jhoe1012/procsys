import React from 'react';
import { Link } from '@inertiajs/react';
import { X } from 'lucide-react';

interface Attachment {
  id: number;
  filename: string;
  filepath: string;
}

interface AttachmentListProps {
  attachments: Attachment[] | undefined;
  canDelete: boolean;
}

const AttachmentList: React.FC<AttachmentListProps> = ({ attachments, canDelete }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 border-t border-gray-200 pt-3 mt-2">
      {attachments &&
        attachments.map((attachment) => (
          <li
            key={attachment.id}
            className="relative h-16 p-3 rounded-md border shadow-sm bg-white flex items-center justify-between"
          >
            <div className="flex flex-col flex-1 min-w-0">
              <a
                href={`/${attachment.filepath}`}
                download
                className="text-sm font-medium text-blue-700 hover:underline truncate"
                title={attachment.filename}
              >
                {attachment.filename}
              </a>
            </div>
            {canDelete && (
              <Link
                preserveScroll
                href={route('attachment.delete', attachment.id)}
                method="delete"
                as="button"
                className="ml-2 px-2 py-1 text-xs text-red-700 bg-red-100 rounded hover:bg-red-200 flex items-center justify-center"
                aria-label="Remove attachment"
                title="Remove"
              >
                <X size={16} strokeWidth={2} />
              </Link>
            )}
          </li>
        ))}
    </ul>
  );
};

export default AttachmentList;
