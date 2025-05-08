import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav>
      <Link href="/" className="flex items-center gap-1">
        <Image src="/logo.svg" alt="logo" height={32} width={38} />
        <h2 className="text-primary-100 text-brand">PrepWise</h2>
      </Link>
    </nav>
  );
};

export default Navbar;
