import { useState, useEffect } from "preact/hooks";
import { createPortal } from "preact/compat";

const services = [
  { href: "/services/deep-cleaning", label: "Deep Cleaning" },
  { href: "/services/standard-cleaning", label: "Standard Cleaning" },
  { href: "/services/move-in-out-cleaning", label: "Move-In / Move-Out" },
  { href: "/services/airbnb-cleaning", label: "Airbnb Turnover" },
  { href: "/services/commercial-cleaning", label: "Commercial" },
  { href: "/services/custom-add-ons", label: "Custom Add-ons" },
];

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const openMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setIsOpen(false);
    setServicesOpen(false);
    document.body.style.overflow = "";
  };

  const overlay = (
    <div
      class={`fixed inset-0 z-[200] flex flex-col backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "rgba(10, 5, 25, 0.96)" }}
    >
      {/* Header row */}
      <div class="flex items-center justify-between px-6 pt-6">
        <a href="/" onClick={closeMenu}>
          <img src="/logo1.webp" alt="Mrs. Irene's Cleaning" class="h-12 w-auto" />
        </a>
        <button
          onClick={closeMenu}
          type="button"
          aria-label="Close menu"
          class="text-white/70 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav class="flex-1 flex flex-col items-center justify-center gap-8">
        <a href="/" onClick={closeMenu} class="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
          Home
        </a>

        <div class="text-center">
          <button
            type="button"
            onClick={() => setServicesOpen(!servicesOpen)}
            class="text-2xl font-bold text-white hover:text-purple-400 transition-colors flex items-center gap-2 mx-auto"
          >
            Services
            <svg
              class={`w-6 h-6 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
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

          <div class={`overflow-hidden transition-all duration-300 ${servicesOpen ? "max-h-96 mt-4" : "max-h-0"}`}>
            <ul class="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.href}>
                  <a href={s.href} onClick={closeMenu} class="text-lg text-purple-300 hover:text-white transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a href="/#about" onClick={closeMenu} class="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
          About
        </a>
      </nav>

      {/* Bottom */}
      <div class="flex flex-col items-center gap-4 pb-12">
        <a
          href="/contact"
          onClick={closeMenu}
          class="bg-purple-600 hover:bg-purple-500 text-white font-bold px-20 py-4 rounded-full transition-colors text-lg"
        >
          Contact Us
        </a>
      </div>
    </div>
  );

  return (
    <div class="relative md:hidden">
      <button
        onClick={openMenu}
        type="button"
        class="flex items-center justify-center w-10 h-10 focus:outline-none"
        aria-label="Open menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
          <title>Menu icon</title>
          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
        </svg>
      </button>

      {mounted && createPortal(overlay, document.body)}
    </div>
  );
};

export default HamburgerMenu;
