import { useReveal } from "../hooks";

const REVIEW_IMAGES = [
  { src: "/reviews/1.png", alt: "Review screenshot 1" },
  { src: "/reviews/2.png", alt: "Review screenshot 2" },
  { src: "/reviews/3.png", alt: "Review screenshot 3" },
  { src: "/reviews/4.png", alt: "Review screenshot 4" },
];

export default function Reviews() {
  const { ref, visible } = useReveal();
  const infiniteImages = [...REVIEW_IMAGES, ...REVIEW_IMAGES];

  return (
    <section id="reviews" ref={ref as React.RefObject<HTMLElement>} className="py-32 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div
          className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-3">
            // reviews
          </p>
          <h2 className="font-display text-6xl md:text-7xl text-text-primary dark:text-dark-text-primary tracking-wide">
            WHAT PEOPLE SAY
          </h2>
        </div>
      </div>

      <div
        className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="overflow-hidden py-7 glass-clay border-y border-accent/20 dark:border-accent/10">
          <div
            className="flex w-max gap-5 animate-scroll-left"
            style={{ animationDuration: "42s" }}
          >
            {infiniteImages.map((image, index) => (
              <figure
                key={`${image.src}-${index}`}
                className="group shrink-0 overflow-hidden rounded-xl border border-accent/20 bg-bg/60 dark:bg-dark-bg/60 w-[86vw] sm:w-[62vw] md:w-[42vw] lg:w-[32vw] max-w-lg"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="block w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04] group-focus-within:scale-[1.04]"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
