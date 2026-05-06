import { useState, useEffect, useRef } from "preact/hooks";

const services = [
  { href: "/services/deep-cleaning", label: "Deep Cleaning" },
  { href: "/services/standard-cleaning", label: "Standard Cleaning" },
  { href: "/services/move-in-out-cleaning", label: "Move-In / Move-Out" },
  { href: "/services/airbnb-cleaning", label: "Airbnb Turnover" },
  { href: "/services/commercial-cleaning", label: "Commercial" },
  { href: "/services/custom-add-ons", label: "Custom Add-ons" },
];

const ServicesDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <li ref={ref} class="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        class="text-lg flex items-center gap-1 cursor-pointer"
      >
        Services
        <svg
          class={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul class="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl py-2 min-w-[220px] z-50 text-gray-800">
          {services.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                class="block px-4 py-2 text-base hover:bg-purple-50 hover:text-purple-700"
                onClick={() => setOpen(false)}
              >
                {s.label}
              </a>
            </li>
          ))}
          <li class="border-t border-gray-100 mt-1 pt-1">
            <a
              href="/services"
              class="block px-4 py-2 text-base text-purple-600 hover:bg-purple-50 font-medium"
              onClick={() => setOpen(false)}
            >
              View All →
            </a>
          </li>
        </ul>
      )}
    </li>
  );
};

export default ServicesDropdown;
