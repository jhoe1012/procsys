import { HTMLAttributes } from 'react';

export default function ApplicationLogo({
  yellowLogo,
  className = '',
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { yellowLogo?: boolean }) {
  return (
    <>
      {yellowLogo ? (
        <img width={300} height={200} src="/asset/logo/Goldilocks-logo-yellow.png" />
      ) : (
        <img width={150} height={100} src="/asset/logo/Goldilocks-logo.png" />
      )}
    </>
  );
}
