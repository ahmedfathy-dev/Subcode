"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaLinkedinIn, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const content = {
  ar: {
    description:
      "شركة برمجة متخصصة في تصميم وتطوير المنتجات الرقمية، من الفكرة الأولى وحتى الإطلاق ومتابعة ما بعد الإطلاق.",
    linksTitle: "روابط سريعة",
    links: [
      { href: "#about", label: "من نحن" },
      { href: "#services", label: "الخدمات" },
      { href: "#work", label: "أعمالنا" },
      { href: "#pricing", label: "الأسعار" },
      { href: "#testimonials", label: "قصص النجاح" },
    ],
    contactTitle: "تواصل معنا",
    email: "hello@company.com",
    location: "القاهرة، مصر",
    rights: "جميع الحقوق محفوظة",
    madeWith: "صُنع بشغف",
  },
  en: {
    description:
      "A software development company crafting digital products from the first idea through launch and beyond.",
    linksTitle: "Quick Links",
    links: [
      { href: "#about", label: "About Us" },
      { href: "#services", label: "Services" },
      { href: "#work", label: "Work" },
      { href: "#pricing", label: "Pricing" },
      { href: "#testimonials", label: "Testimonials" },
    ],
    contactTitle: "Contact Us",
    email: "hello@company.com",
    location: "Cairo, Egypt",
    rights: "All rights reserved",
    madeWith: "Made with passion",
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language];
  const isAr = language === "ar";
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line/60 bg-white/60 backdrop-blur-xl">
      {/* ambient glow, matches the hero/body background language */}
      <div className="pointer-events-none absolute -top-32 start-1/4 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 end-1/4 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:px-10">
        <div
          className={`grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 ${
            isAr ? "text-right" : "text-left"
          }`}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <a href="#top" className="inline-flex items-center">
              <img
                src="/logo2.jpg"
                alt="Logo"
                className="h-11 w-11 rounded-full object-cover"
              />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-7 text-muted">
              {t.description}
            </p>

            <div className={`mt-6 flex items-center gap-3 ${isAr ? "justify-end sm:justify-start" : ""}`}>
              <motion.a
                whileHover={{ y: -3, scale: 1.05 }}
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line/60 text-ink transition-colors duration-300 hover:border-transparent hover:bg-green-500 hover:text-white"
              >
                <FaWhatsapp size={17} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3, scale: 1.05 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line/60 text-ink transition-colors duration-300 hover:border-transparent hover:bg-accent hover:text-white"
              >
                <FaLinkedinIn size={16} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-display text-base font-bold text-ink">
              {t.linksTitle}
            </h4>
            <ul className="mt-5 space-y-3">
              {t.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-accent"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent/50 transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-display text-base font-bold text-ink">
              {t.contactTitle}
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li className={`flex items-center gap-2 ${isAr ? "justify-end sm:justify-start" : ""}`}>
                <FaEnvelope className="shrink-0 text-accent" size={13} />
                <span dir="ltr">{t.email}</span>
              </li>
              <li className={`flex items-center gap-2 ${isAr ? "justify-end sm:justify-start" : ""}`}>
                <FaMapMarkerAlt className="shrink-0 text-accent" size={13} />
                {t.location}
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line/60 pt-6 text-xs text-muted sm:flex-row"
        >
          <p>
            © {year} — {t.rights}
          </p>
          <p>{t.madeWith}</p>
        </motion.div>
      </div>
    </footer>
  );
}