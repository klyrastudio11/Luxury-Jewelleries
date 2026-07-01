import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-sand">404</p>
        <h1 className="mt-4 font-serif text-4xl">The page you seek is not found.</h1>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-ivory">Return Home</Link>
      </div>
    </main>
  );
}
