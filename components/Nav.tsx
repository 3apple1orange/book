"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { book, person } from "@/lib/content";

const links = [
  { label: "Contents", href: "/#about" },
  { label: "A Note", href: "/#preview" },
  { label: "Images", href: "/#images" },
];

const menuFooterLinks = [
  { label: "Privacy", href: "/privacy", external: false },
  { label: "Terms", href: "/terms", external: false },
  { label: person.siteLabel, href: person.siteUrl, external: true },
  { label: "LinkedIn", href: person.linkedin, external: true },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="border-b border-border bg-paper sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="font-script text-2xl text-ink" onClick={() => setOpen(false)}>
          {book.author}
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-serif text-sm tracking-[0.15em] uppercase text-ink hover:text-muted transition-colors border-b border-transparent hover:border-ink pb-1"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={book.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-block font-serif text-sm tracking-[0.1em] uppercase border border-ink text-ink px-5 py-2 hover:bg-ink hover:text-paper transition-colors"
        >
          Get a Copy
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="lg:hidden font-serif text-xs uppercase tracking-[0.2em] text-ink"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile full-screen menu (sits below the bar, so the bar stays clickable) */}
      {open && (
        <div
          id="mobile-menu"
          data-lenis-prevent
          className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-paper overflow-y-auto flex flex-col px-6 pt-6 pb-10"
        >
          <ul className="border-t border-border">
            {links.map((link, i) => (
              <li key={link.href} className="border-b border-border">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-5 py-5"
                >
                  <span className="font-serif italic text-sm text-muted w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-3xl text-ink">{link.label}</span>
                </a>
              </li>
            ))}
            <li className="border-b border-border">
              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-5 py-5"
              >
                <span className="font-serif italic text-sm text-muted w-6">
                  {String(links.length + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-3xl text-blood">Get a Copy</span>
              </a>
            </li>
          </ul>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-10">
            {menuFooterLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => setOpen(false)}
                className="font-serif text-xs uppercase tracking-[0.2em] text-muted"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="mt-auto pt-10 font-serif text-sm text-muted space-y-1">
            <a href={`mailto:${person.email}`} className="block text-ink">
              {person.email}
            </a>
            <p>{person.location}</p>
          </div>
        </div>
      )}
    </header>
  );
}