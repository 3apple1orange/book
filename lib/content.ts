// Single source of truth for every fact on the site.

export type BookFormat = "EBook" | "Paperback" | "Hardcover";

export interface FactRow {
  code: string;
  value: string;
}

export interface Chapter {
  no: number;
  title: string;
  description?: string;
}

export interface Part {
  numeral: string;
  title: string;
  chapters: Chapter[];
}

export const site = {
  domain: "meetmeinthebackyard.com",
  title: "Meet Me in the Backyard | Book by Manan Singla",
  description:
    "Meet Me in the Backyard by Manan Singla. A work of philosophical reflection on identity, fear and the private life of the mind.",
  ogImage: "/og-image.jpg", // must be a real 1200x630 file in /public
  googleSiteVerification: "", // add once Search Console is set up
};

export const person = {
  name: "Manan Singla",
  id: "https://www.manansingla.com/#person",
  aboutUrl: "https://www.manansingla.com/about",
  siteUrl: "https://www.manansingla.com",
  siteLabel: "manansingla.com",
  email: "hello@meetmeinthebackyard.com",
  location: "Mumbai, India and San Francisco Bay Area, US",
  linkedin: "https://www.linkedin.com/in/manan-singla-548716271/",
};

export const book = {
  title: "Meet Me in the Backyard",
  author: person.name,
  authorUrl: person.aboutUrl,
  authorPersonId: person.id,
  positioning:
    "A work of philosophical reflection on identity, fear and the private life of the mind.",
  language: "en",
  isbn: "9798186077299",
  // Brief rule: never enter "Amazon" as publisher. Add "Amazon KDP" here only if the client insists.
  publishers: ["Notion Press"],
  datePublished: "2026-07-11",
  formats: ["EBook", "Paperback", "Hardcover"] as BookFormat[],
  kindle: {
    asin: "B0H8JFNH8F",
    numberOfPages: 458,
  },
  amazonUrl: "https://www.amazon.in/Meet-Me-Backyard-Manan-Singla-ebook/dp/B0H8JFNH8F",
};

// Themes strip at the bottom of the red section (from the book cover)
export const facts: FactRow[] = [
  { code: "I.", value: "Identity" },
  { code: "II.", value: "Fear" },
  { code: "III.", value: "Truth" },
  { code: "IV.", value: "Becoming" },
];

// Add a `description` to any chapter and it becomes expandable automatically.
export const contents: Part[] = [
  {
    numeral: "I",
    title: "The Animal That Knows",
    chapters: [
      { no: 1, title: "The Animal That Knows It Will Die" },
      { no: 2, title: "The Self Is an Alibi" },
      { no: 3, title: "The Most Intelligent Form of Avoidance" },
      { no: 4, title: "Tomorrow Is a Religion" },
    ],
  },
  {
    numeral: "II",
    title: "The Machine That Learns Your Hunger",
    chapters: [
      { no: 5, title: "The Feed Does Not Show You the World" },
      { no: 6, title: "The Performance of a Person" },
      { no: 7, title: "Outrage Is a Status Drug" },
      { no: 8, title: "The Death of the Private Mind" },
    ],
  },
  {
    numeral: "III",
    title: "Rank, Sex, and the Modern Man",
    chapters: [
      { no: 9, title: "The Crisis of Men Is Spectatorship" },
      { no: 10, title: "Testosterone Is Not Character" },
      { no: 11, title: "The Alpha Is a Costume" },
      { no: 12, title: "Women Choose, Men Compete, Everyone Lies" },
      { no: 13, title: "Pornography and the Collapse of Pursuit" },
      { no: 14, title: "Desire Is Nature Voting" },
    ],
  },
  {
    numeral: "IV",
    title: "The Exit",
    chapters: [
      { no: 15, title: "Comfort Is Cowardice Made Beautiful" },
      { no: 16, title: "Become Unmarketable" },
      { no: 17, title: "Live Without an Audience" },
      { no: 18, title: "The Practice of Dying Before Death" },
      { no: 19, title: "Living Before You Understand" },
      { no: 20, title: "Do Not Believe This Book" },
    ],
  },
];