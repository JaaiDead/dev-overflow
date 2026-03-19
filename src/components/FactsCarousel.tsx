import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  icon: string;
  text: string;
}

interface FactsCarouselProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
}

export default function FactsCarousel({ items, autoPlayInterval = 4000 }: FactsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPaused, items.length, autoPlayInterval]);

  const next = () => setCurrent((prev) => (prev + 1) % items.length);
  const prev = () => setCurrent((p) => (p - 1 + items.length) % items.length);
  const goTo = (index: number) => setCurrent(index);

  if (items.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main carousel content */}
      <div className="glass-clay px-6 py-5 min-h-[100px] flex items-center justify-center relative overflow-hidden">
        {/* Navigation buttons */}
        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 z-10 w-8 h-8 glass-sm rounded-full flex items-center justify-center text-text-dim dark:text-dark-text-dim hover:text-accent transition-all hover:scale-110"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 z-10 w-8 h-8 glass-sm rounded-full flex items-center justify-center text-text-dim dark:text-dark-text-dim hover:text-accent transition-all hover:scale-110"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Carousel items */}
        <div className="flex items-center justify-center gap-2 px-10 text-center">
          <span className="text-2xl animate-slide-carousel">{items[current].icon}</span>
          <span
            key={current}
            className="font-mono text-sm text-text-dim dark:text-dark-text-dim animate-slide-carousel"
          >
            {items[current].text}
          </span>
        </div>
      </div>

      {/* Dot indicators */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all ${
                index === current
                  ? "w-8 h-2 bg-accent rounded-full"
                  : "w-2 h-2 bg-text-muted dark:bg-dark-text-muted rounded-full hover:bg-text-dim dark:hover:bg-dark-text-dim"
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
