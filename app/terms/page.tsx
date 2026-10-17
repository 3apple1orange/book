import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { site, book, person } from "@/lib/content";

const url = `https://${site.domain}/terms`;
const description = `Terms of use for ${site.domain}.`;

export const metadata: Metadata = {
  title: "Terms of Use",
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `Terms of Use | ${book.title}`,
    description,
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
};

const sections: LegalSection[] = [
  {
    heading: "Using this website",
    body: [
      `By using ${site.domain} you agree to these terms. If you do not agree with them, please do not use the site.`,
    ],
  },
  {
    heading: "Ownership of the content",
    body: [
      `All text, chapter titles, quotations from the book and images on this site belong to ${person.name} unless stated otherwise, and are protected by copyright.`,
      `You are welcome to share links to this site and to quote short passages for review or discussion, as long as you credit ${person.name} and ${book.title}. Any other copying, reproduction or republication needs written permission.`,
    ],
  },
  {
    heading: "Buying the book",
    body: [
      "The book is sold through Amazon and other retailers. Orders, prices, delivery and refunds are handled entirely by the retailer you buy from, under that retailer's own terms.",
    ],
  },
  {
    heading: "Not professional advice",
    body: [
      "The book and this site are works of philosophical reflection. Nothing here is medical, psychological, legal or financial advice, and it should not be relied on as a substitute for advice from a qualified professional.",
    ],
  },
  {
    heading: "Links to other websites",
    body: [
      "This site links to websites we do not control. We are not responsible for their content, availability or practices.",
    ],
  },
  {
    heading: "No warranty",
    body: [
      "The site is provided as it is. We try to keep it accurate and available, but we cannot promise that it will always be complete, current or free of errors, and we are not liable for any loss arising from its use, to the extent the law allows.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of India, and any dispute will be handled by the courts of Mumbai.",
    ],
  },
  {
    heading: "Contact",
    body: [`Questions about these terms can be sent to ${person.email}.`],
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms of Use" updated="17 October 2026" sections={sections} />;
}