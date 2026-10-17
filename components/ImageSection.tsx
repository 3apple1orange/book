import StickyImages from "@/components/StickyImages";
import { book } from "@/lib/content";

const bookImages = [
  { id: 1, image: "/images/book1.jpeg", alt: `${book.title} by ${book.author}, photo 1` },
  { id: 2, image: "/images/book2.jpeg", alt: `${book.title} by ${book.author}, photo 2` },
  { id: 3, image: "/images/book3.jpeg", alt: `${book.title} by ${book.author}, photo 3` },
  { id: 4, image: "/images/book4.jpeg", alt: `${book.title} by ${book.author}, photo 4` },
  { id: 5, image: "/images/book5.jpeg", alt: `${book.title} by ${book.author}, photo 5` },
  { id: 6, image: "/images/book6.jpeg", alt: `${book.title} by ${book.author}, photo 6` },
  { id: 7, image: "/images/book7.jpeg", alt: `${book.title} by ${book.author}, photo 7` },
];

export default function ImagesSection() {
  return (
    <section id="images">
      <p className="font-serif text-xs tracking-[0.3em] uppercase text-muted text-center pt-8 pb-2">
        A Closer Look
      </p>
      <StickyImages cards={bookImages} />
    </section>
  );
}