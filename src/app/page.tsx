import { ArrowRight, Gem, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const collections = [
  {
    title: 'Solstice Rings',
    description: 'Champagne diamonds set in sculptural gold bands.',
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Velvet Drops',
    description: 'Soft lines, rich brilliance, and a timeless signature.',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Midnight Cuffs',
    description: 'An architectural statement in warm gold tones.',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
  },
];

const testimonials = [
  {
    quote: 'A masterpiece of quiet luxury and deliberate detail.',
    author: 'Mira D.',
  },
  {
    quote: 'The craftsmanship feels as rare as the stones themselves.',
    author: 'Anika S.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-20 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,180,106,0.25),_transparent_45%)]" />
        <div className="mx-auto grid max-w-7xl flex-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-5 text-sm uppercase tracking-[0.35em] text-sand">Klyra Studio</p>
            <h1 className="font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
              Jewellery that feels like a private legend.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-700">
              Discover sculptural heirlooms shaped with warmth, precision, and a quiet sense of extravagance.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/collections"
                className="rounded-full border border-charcoal bg-charcoal px-7 py-3 text-sm font-semibold text-ivory transition hover:bg-zinc-800"
              >
                Explore Collections
              </Link>
              <Link
                href="/product"
                className="rounded-full border border-champagne/70 bg-white/70 px-7 py-3 text-sm font-semibold text-charcoal backdrop-blur transition hover:border-champagne"
              >
                View Signature Piece
              </Link>
            </div>
            <div className="mt-10 flex gap-10 text-sm text-zinc-600">
              <div>
                <div className="font-semibold text-charcoal">20k+</div>
                <div>Clients served</div>
              </div>
              <div>
                <div className="font-semibold text-charcoal">24/7</div>
                <div>Private concierge</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-champagne/20 via-transparent to-sand/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/70 p-6 shadow-luxe backdrop-blur-xl">
              <Image
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury jewellery display"
                width={900}
                height={1100}
                className="h-[560px] w-full rounded-[2rem] object-cover"
              />
              <div className="absolute bottom-10 left-10 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-charcoal backdrop-blur">
                Curated in London • Crafted for eternity
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/70 px-6 py-16 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
          {collections.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-[2rem] border border-black/10 bg-ivory shadow-sm transition hover:-translate-y-2">
              <Image src={item.image} alt={item.title} width={700} height={500} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-7">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{item.description}</p>
                <Link href="/collections" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-champagne">
                  Discover <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] border border-black/10 bg-charcoal px-8 py-14 text-ivory lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-champagne">Craftsmanship</p>
            <h2 className="font-serif text-3xl sm:text-4xl">Every piece is formed through deliberate artistry.</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6">
              <Gem className="mb-4 text-champagne" size={24} />
              <h3 className="font-semibold">Heirloom quality</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-300">Ethically sourced stones with a hand-finished surface that catches light with grace.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6">
              <Sparkles className="mb-4 text-champagne" size={24} />
              <h3 className="font-semibold">Signature detailing</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-300">Sculptural silhouettes and softly faceted brilliance for a modern heirloom.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-black/10 bg-white/80 p-8 shadow-sm lg:p-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sand">Testimonials</p>
              <h2 className="font-serif text-3xl sm:text-4xl">Beloved by collectors and celebrants alike.</h2>
            </div>
            <Link href="/collections" className="text-sm font-semibold text-charcoal">View all pieces</Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {testimonials.map((item) => (
              <div key={item.author} className="rounded-[1.75rem] border border-black/10 bg-ivory p-8">
                <div className="flex gap-1 text-champagne">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-8 text-zinc-700">“{item.quote}”</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-charcoal">{item.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
