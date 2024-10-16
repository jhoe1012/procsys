import { ILink, IPRHeaderPage, PageProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }: { links: ILink[] }) {
  return (
    <nav className="text-center mt-4">
      {links.map((link: ILink) => (
        <Link
          key={link.label}
          href={link.url || ''}
          className={
            'inline-block py-2 px-3 m-0.5 rounded-lg text-gray-500 text-xs ' +
            (link.active ? 'bg-gray-950 ' : ' ') +
            (!link.url ? '!text-gray-500 cursor-not-allowed ' : 'hover:bg-gray-950')
          }
          preserveScroll
          dangerouslySetInnerHTML={{ __html: link.label }}></Link>
      ))}
    </nav>
  );
}
