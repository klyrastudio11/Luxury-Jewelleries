"use client";

import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="text-lg font-semibold tracking-[0.35em] text-charcoal">KLYRA</Link>
        <nav className="hidden items-center gap-7 text-sm text-zinc-700 md:flex">
          <Link href="/">Home</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/product">Product</Link>
          <Link href="/admin/login">About</Link>
          <Link href="/admin/login">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-black/10 p-2.5" aria-label="Search">
            <Search size={16} />
          </button>
          <button className="rounded-full border border-black/10 p-2.5" aria-label="Cart">
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
