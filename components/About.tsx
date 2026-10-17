import Manifesto from "@/components/Manifesto";
import SectionMarker from "@/components/SectionMarker";
import EpigraphQuote from "@/components/EpigraphQuote";
import { DrawLine, FadeUp } from "@/components/Motion";
import { book } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionMarker label="The contents" count="01 / 04" />

        {/* Epigraph page, set like the front matter of a book */}
        <div className="max-w-3xl mx-auto text-center py-10 md:py-20 mb-16 md:mb-24">
          <FadeUp>
            <p className="font-cinzel text-sm md:text-base tracking-[0.45em] uppercase text-ink">
              Contents
            </p>
          </FadeUp>

          {/* Ornament: thin line, red dot, thin line */}
          <div className="flex items-center justify-center gap-4 mt-5 mb-12 md:mb-16" aria-hidden="true">
            <div className="w-16 md:w-24">
              <DrawLine className="bg-ink/30" />
            </div>
            <span className="block w-2 h-2 rounded-full bg-blood" />
            <div className="w-16 md:w-24 rotate-180">
              <DrawLine className="bg-ink/30" />
            </div>
          </div>

          <EpigraphQuote
            credit={
              <cite className="not-italic font-cinzel text-xs md:text-sm tracking-[0.3em] uppercase text-muted">
                {book.author} &nbsp;&middot;&nbsp;{" "}
                <span className="italic font-serif normal-case tracking-normal text-sm md:text-base">
                  {book.title}
                </span>
              </cite>
            }
          />

          <FadeUp delay={0.3}>
            <p className="font-serif italic text-sm md:text-base text-muted mt-14 md:mt-20">
              Twenty chapters in four parts
            </p>
          </FadeUp>
        </div>

        <Manifesto />
      </div>
    </section>
  );
}