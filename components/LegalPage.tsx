import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export interface LegalSection {
  heading: string;
  body: string[];
}

export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-12 py-16 md:py-24">
        <article className="max-w-2xl mx-auto">
          <span className="block w-3 h-3 rounded-full bg-blood mb-8" aria-hidden="true" />
          <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight">{title}</h1>
          <p className="font-serif italic text-muted mt-4">Last updated {updated}</p>
          <div className="h-px bg-border my-10 md:my-14" />

          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-serif text-xl md:text-2xl text-ink mb-4">{s.heading}</h2>
                <div className="space-y-4">
                  {s.body.map((p, i) => (
                    <p key={i} className="font-serif text-base md:text-lg leading-relaxed text-ink/80">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}