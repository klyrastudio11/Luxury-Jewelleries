import Link from 'next/link';

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-charcoal px-6 py-24 text-ivory">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-champagne">Private Access</p>
        <h1 className="mt-4 font-serif text-3xl">Admin Login</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-300">Secure access for studio operations and order management.</p>
        <form className="mt-8 space-y-4">
          <input className="w-full rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none" placeholder="Email" />
          <input className="w-full rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none" placeholder="Password" type="password" />
          <button className="w-full rounded-full bg-champagne px-5 py-3 text-sm font-semibold text-charcoal">Enter Studio</button>
        </form>
        <Link href="/" className="mt-6 inline-block text-sm text-zinc-300">Return to storefront</Link>
      </div>
    </main>
  );
}
