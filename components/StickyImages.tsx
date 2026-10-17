"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CardData {
  id: number | string;
  image: string;
  alt?: string;
}

interface StickyImagesProps {
  cards: CardData[];
  className?: string;
}

const pad = (n: number) => n.toString().padStart(2, "0");

export default function StickyImages({ cards, className }: StickyImagesProps) {
  const container = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const imageElements = imageRefs.current;
      const totalCards = imageElements.length;
      if (!imageElements[0]) return;

      gsap.set(imageElements[0], { y: 0, yPercent: 0, scale: 1, rotation: 0 });
      for (let i = 1; i < totalCards; i++) {
        if (!imageElements[i]) continue;
        gsap.set(imageElements[i], { y: 0, yPercent: 101, scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-images",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
          onUpdate: (self) => {
            setActive(Math.min(totalCards - 1, Math.round(self.progress * (totalCards - 1))));
          },
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentImage = imageElements[i];
        const nextImage = imageElements[i + 1];
        if (!currentImage || !nextImage) continue;

        scrollTimeline.to(currentImage, { scale: 0.9, rotation: -3, duration: 1, ease: "none" }, i);
        scrollTimeline.to(nextImage, { yPercent: 0, duration: 1, ease: "none" }, i);
      }

      const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
      if (container.current) resizeObserver.observe(container.current);

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.scrollTrigger?.kill();
        scrollTimeline.kill();
      };
    },
    { scope: container }
  );

  return (
    <div className={cn("relative h-full w-full", className)} ref={container}>
      <div className="sticky-images relative flex h-screen w-full items-center justify-center overflow-hidden px-4 py-6 lg:px-8">
        <div className="relative h-[90%] w-full max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-6xl overflow-hidden rounded-lg bg-paper">
          {cards.map((card, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={card.id}
              src={card.image}
              alt={card.alt || ""}
              className="absolute inset-0 h-full w-full object-cover"
              style={i > 0 ? { transform: "translateY(101%)" } : undefined}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
            />
          ))}

          <div className="absolute bottom-4 left-4 z-10 rounded-full bg-paper/90 px-3 py-1 font-grotesk font-bold text-xs tracking-[0.1em] text-ink tabular-nums">
            {pad(active + 1)} / {pad(cards.length)}
          </div>
        </div>
      </div>
    </div>
  );
}