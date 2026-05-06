import { useState, useRef } from "preact/hooks";
import { services } from "../utils/data";

const ServicesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const progress = el.scrollLeft / maxScroll;
    const index = Math.round(progress * (services.length - 1));
    setActiveIndex(index);
  };

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (maxScroll / (services.length - 1)) * index, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <div>
      {/* Mobile: horizontal slider */}
      <div class="md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
          style="scrollbar-width: none; -webkit-overflow-scrolling: touch;"
        >
          {services.map((service, i) => (
            <div
              key={i}
              class="snap-start shrink-0 w-[82vw] flex items-start gap-4 p-5 rounded-2xl border border-box-border bg-box-bg shadow-sm"
            >
              <div class="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white p-2.5">
                <span class="flex" dangerouslySetInnerHTML={{ __html: service.icon }} />
              </div>
              <div>
                <h3 class="text-base font-semibold text-heading-2 mb-1">{service.title}</h3>
                <p class="text-sm text-heading-3 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div class="flex justify-center gap-2 mt-5">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Slide ${i + 1}`}
              class={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-purple-600" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, i) => (
          <div
            key={i}
            class="flex items-start gap-4 p-5 rounded-2xl border border-box-border bg-box-bg shadow-sm hover:shadow-lg hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white p-2.5">
              <span class="flex" dangerouslySetInnerHTML={{ __html: service.icon }} />
            </div>
            <div>
              <h3 class="text-base font-semibold text-heading-2 mb-1">{service.title}</h3>
              <p class="text-sm text-heading-3 leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSlider;
