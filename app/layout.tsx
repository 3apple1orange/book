import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Allura, Cinzel, Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { site, book } from "@/lib/content";

const allura = Allura({ subsets: ["latin"], weight: "400", variable: "--font-allura", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-cinzel", display: "swap" });
const grotesk = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-grotesk",
  display: "swap",
});

const siteUrl = `https://${site.domain}`;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Cloudflare Pages: only the production branch gets indexed. Preview builds stay noindex.
const isProduction = process.env.CF_PAGES
  ? process.env.CF_PAGES_BRANCH === "main"
  : process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s | ${book.title}` },
  description: site.description,
  authors: [{ name: book.author, url: book.authorUrl }],
  alternates: { canonical: siteUrl },
  verification: site.googleSiteVerification ? { google: site.googleSiteVerification } : undefined,
  openGraph: {
    type: "book",
    url: siteUrl,
    siteName: book.title,
    title: site.title,
    description: site.description,
    isbn: book.isbn,
    releaseDate: book.datePublished,
    authors: [book.authorUrl],
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${book.title} by ${book.author}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const bookId = `${siteUrl}/#book`;

  const bookNode: Record<string, unknown> = {
    "@type": "Book",
    "@id": bookId,
    url: siteUrl,
    name: book.title,
    author: { "@id": book.authorPersonId },
    description: book.positioning,
    image: `${siteUrl}${site.ogImage}`,
    inLanguage: book.language,
  };
  if (book.isbn) bookNode.isbn = book.isbn;
  if (book.datePublished) bookNode.datePublished = book.datePublished;
  if (book.publishers.length) {
    bookNode.publisher = book.publishers.map((name) => ({ "@type": "Organization", name }));
  }

  // One edition per format. Kindle carries the verified ASIN and page count.
  bookNode.workExample = book.formats.map((format) => {
    const edition: Record<string, unknown> = {
      "@type": "Book",
      "@id": `${siteUrl}/#book-${format.toLowerCase()}`,
      name: book.title,
      author: { "@id": book.authorPersonId },
      bookFormat: `https://schema.org/${format}`,
      inLanguage: book.language,
      datePublished: book.datePublished,
      exampleOfWork: { "@id": bookId },
    };
    if (format === "EBook") {
      edition.identifier = { "@type": "PropertyValue", propertyID: "ASIN", value: book.kindle.asin };
      edition.numberOfPages = book.kindle.numberOfPages;
      edition.url = book.amazonUrl;
    }
    return edition;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      bookNode,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: book.title,
        publisher: { "@id": book.authorPersonId },
      },
    ],
  };

  return (
    <html lang="en" className={`${allura.variable} ${cinzel.variable} ${grotesk.variable}`}>
      <body className="font-serif bg-paper text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {GA_ID && isProduction && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}