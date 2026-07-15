import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaLinkedinIn, FaBars, FaTimes } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const content = {
  ar: {
    nav: [
      { href: "#hero", label: "الرئيسية" },
      { href: "#problem-solution", label: "المشكلة والحل" },
      { href: "#work", label: "أعمالنا" },
      { href: "#why-choose-us", label: "ليه تختارنا" },
      { href: "#about", label: "من نحن" },
    ],
  },
  en: {
    nav: [
      { href: "#hero", label: "Home" },
      { href: "#problem-solution", label: "Problem & Solution" },
      { href: "#work", label: "Our Work" },
      { href: "#why-choose-us", label: "Why Choose Us" },
      { href: "#about", label: "About Us" },
    ],
  },
};

const languageOptions = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
];

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const t = content[language];

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  function handleSelect(code) {
    setLanguage(code);
    setMenuOpen(false);
  }

  return (
    <div className="sticky top-4 z-50 px-4">
      <header
        className="
        relative mx-auto flex max-w-5xl items-center justify-between
        rounded-full
        border border-white/70 bg-white/70 px-4 py-2.5
        shadow-[0_10px_40px_rgba(15,23,42,.10)]
        backdrop-blur-2xl
        transition-shadow duration-300
        hover:shadow-[0_20px_55px_rgba(37,99,235,.16)]
        "
      >
        {/* decorative layer — clipped to the pill shape, kept separate so dropdowns below aren't clipped */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
          <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl" />
          <div className="absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-sky-400/10 blur-2xl" />
        </div>

        {/* Logo */}
        <a href="#hero" className="group relative z-10 flex items-center gap-2 ps-1">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-accent/30 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <img
              src="/images/hero/logo8.jpeg"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white transition-all duration-300 group-hover:ring-accent/40 group-hover:scale-105"
            />
          </div>
        </a>

        {/* Navigation — sliding pill highlight */}
        <nav className="relative z-10 hidden items-center gap-1 rounded-full bg-ink/[0.035] p-1 md:flex">
          {t.nav.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
            >
              {hovered === i && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_4px_14px_rgba(15,23,42,.08)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="relative z-10 flex items-center gap-2">
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 rounded-full border border-line/50 px-3 py-2 text-sm text-ink transition-all duration-300 hover:border-accent/40 hover:bg-accent-soft"
            >
              <img
                src={language === "en" ? "/lang1.svg" : "/logo1.png"}
                alt=""
                className="h-5 w-5 rounded-full object-cover"
              />
              <span className="hidden sm:inline">
                {language === "ar" ? "العربية" : "English"}
              </span>
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute end-0 mt-2 w-36 overflow-hidden rounded-xl border border-line/60 bg-white shadow-[0_20px_45px_rgba(15,23,42,.14)]"
                >
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleSelect(option.code)}
                      className={`w-full px-4 py-3 text-start text-sm transition-colors duration-200 hover:bg-accent-soft ${
                        option.code === language
                          ? "font-semibold text-accent"
                          : "text-ink"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/201068389295"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-green-500 hover:text-white hover:shadow-[0_10px_25px_rgba(34,197,94,.35)] sm:flex"
          >
            <FaWhatsapp size={18} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-accent hover:text-white hover:shadow-[0_10px_25px_rgba(37,99,235,.35)] sm:flex"
          >
            <FaLinkedinIn size={17} />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line/50 text-ink transition-colors duration-300 hover:bg-accent-soft md:hidden"
          >
            {mobileOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mx-auto mt-3 max-w-5xl overflow-hidden rounded-3xl border border-white/60 bg-white/95 p-5 shadow-[0_25px_60px_rgba(15,23,42,.16)] backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {t.nav.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-4 flex items-center gap-3 border-t border-line/60 pt-4">
              <a
                href="https://wa.me/201068389295"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line/50 transition-all duration-300 hover:bg-green-500 hover:text-white"
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line/50 transition-all duration-300 hover:bg-accent hover:text-white"
              >
                <FaLinkedinIn size={17} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}