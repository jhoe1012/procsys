import React from 'react';
import { Link } from '@inertiajs/react';

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
            className="relative h-14 p-2 rounded-md border shadow-sm bg-white flex items-center justify-between"
          >
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-xs text-blue-600 truncate">
                <a href={`/${attachment.filepath}`} download>
                  {attachment.filename}
                </a>
              </span>
            </div>
            {canDelete && (
              <Link
                preserveScroll
                href={route('attachment.delete', attachment.id)}
                method="delete"
                as="button"
                className="ml-2 px-2 py-1 text-[10px] text-red-600 bg-red-100 rounded hover:bg-red-200"
                aria-label="Remove attachment"
                title="Remove"
              >
                Remove
              </Link>
            )}
          </li>
        ))}
    </ul>
  );
};

export default AttachmentList;
