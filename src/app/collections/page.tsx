import Link from 'next/link';
import Image from 'next/image';

const products = [
  { name: 'Aurora Pendant', price: '$4,800', category: 'Necklaces', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80' },
  { name: 'Velvet Ring', price: '$2,100', category: 'Rings', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80' },
  { name: 'Ember Bracelet', price: '$3,250', category: 'Bracelets', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80' },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-ivory px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sand">Collections</p>
            <h1 className="font-serif text-4xl sm:text-5xl">Curated pieces for enduring rituals.</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">All</button>
            <button className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">Rings</button>
            <button className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">Necklaces</button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Link key={product.name} href="/product" className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition hover:-translate-y-2">
              <Image src={product.image} alt={product.name} width={900} height={700} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl">{product.name}</h2>
                  <span className="text-sm font-semibold text-champagne">{product.price}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-600">{product.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
