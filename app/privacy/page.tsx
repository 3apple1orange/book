import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { site, book, person } from "@/lib/content";

const url = `https://${site.domain}/privacy`;
const description = `How ${site.domain} handles information about its visitors.`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `Privacy Policy | ${book.title}`,
    description,
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
};

const sections: LegalSection[] = [
  {
    heading: "About this website",
    body: [
      `${site.domain} presents the book ${book.title} by ${person.name}. This policy explains what information is collected when you visit the site and how it is used.`,
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "This site has no accounts, no sign up forms and no payments. You can read every page without giving us any personal information.",
      `If you write to ${person.email}, we receive your email address and the contents of your message. We use them only to reply to you and do not add you to any mailing list.`,
    ],
  },
  {
    heading: "Analytics and cookies",
    body: [
      "We may use Google Analytics to understand how visitors use the site, for example which pages are viewed, roughly where visitors are located, and what device or browser they use. Google Analytics uses cookies to do this, and the data is processed by Google under its own privacy policy.",
      "You can block or delete cookies in your browser settings, or install the Google Analytics opt out browser add on, and the site will continue to work normally.",
    ],
  },
  {
    heading: "Hosting",
    body: [
      "The site is hosted on Cloudflare, which may process technical information such as your IP address in order to deliver the site securely and protect it from abuse.",
    ],
  },
  {
    heading: "Buying the book and other websites",
    body: [
      "Copies of the book are sold through Amazon and other retailers. When you follow a link to a retailer or to any other website, that website's own privacy policy applies, not this one.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      `You may ask us to delete any correspondence you have sent, or ask what information we hold about you, by writing to ${person.email}.`,
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "If this policy changes, the updated version will be published on this page with a new date at the top.",
    ],
  },
  {
    heading: "Contact",
    body: [`Questions about this policy can be sent to ${person.email}.`],
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="17 October 2026" sections={sections} />;
}