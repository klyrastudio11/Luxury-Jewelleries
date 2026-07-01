import { Heart, ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';

const relatedProducts = [
  { name: 'Eclipse Earrings', price: '$1,950' },
  { name: 'Noir Pendant', price: '$2,750' },
];

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-ivory px-6 py-24 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <Image src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80" alt="Signature jewellery piece" width={1200} height={1400} className="h-[560px] w-full rounded-[2rem] object-cover" />
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <Image key={item} src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80" alt="thumbnail" width={600} height={600} className="h-32 w-full rounded-[1.25rem] object-cover" />
            ))}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-black/10 bg-white/80 p-8 shadow-sm backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-sand">Signature Collection</p>
          <h1 className="mt-4 font-serif text-4xl">The Celeste Pendant</h1>
          <div className="mt-4 flex items-center gap-2 text-champagne">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={16} fill="currentColor" />
            ))}
            <span className="ml-2 text-sm text-zinc-600">4.9 • 312 reviews</span>
          </div>
          <p className="mt-6 text-lg leading-8 text-zinc-700">A sculptural pendant featuring a halo of diamond pavé and a softly polished gold frame.</p>
          <div className="mt-8 text-3xl font-semibold text-charcoal">$6,400</div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-ivory"> <ShoppingBag size={16} /> Add to Cart</button>
            <button className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold">Buy Now</button>
            <button className="rounded-full border border-black/10 p-3"><Heart size={16} /></button>
          </div>
          <div className="mt-10 space-y-4 text-sm text-zinc-700">
            <div><span className="font-semibold text-charcoal">Availability:</span> In stock</div>
            <div><span className="font-semibold text-charcoal">Specifications:</span> 18k gold, VVS diamonds</div>
          </div>
          <div className="mt-10">
            <h2 className="font-serif text-2xl">Related pieces</h2>
            <div className="mt-4 space-y-3">
              {relatedProducts.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-[1.25rem] border border-black/10 bg-ivory px-4 py-4">
                  <span>{item.name}</span>
                  <span className="text-sm font-semibold text-champagne">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
