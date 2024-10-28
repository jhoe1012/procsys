import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { AnchorHTMLAttributes } from 'react';

export default function DownloadButton({ href }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      target="_blank"
      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm p-1 text-center "
      title="Download">
      <ArrowDownTrayIcon className="w-6 h-6" />
    </a>
  );
}
