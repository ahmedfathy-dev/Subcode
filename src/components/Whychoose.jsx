import { motion } from "framer-motion";
import {
  FaBolt,
  FaCode,
  FaHeadset,
  FaShieldAlt,
  FaCubes,
  FaTags,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const content = {
  ar: {
    eyebrow: "ليه تختارنا",
    heading: "شغلنا بيتكلم قبلنا",
    subheading:
      "مش بس بنكتب كود، إحنا بنبني منتجات بتشتغل صح من أول يوم، وبنفضل معاك بعد التسليم مش بس لحد ما تدفع.",
    features: [
      {
        icon: FaBolt,
        title: "سرعة تسليم حقيقية",
        desc: "بنحدد تايم لاين واضح من البداية ونلتزم بيه، من غير مماطلة أو أعذار.",
      },
      {
        icon: FaCode,
        title: "كود نضيف وقابل للتوسع",
        desc: "بنكتب كود متقروء ومنظم، سهل حد تاني يكمل عليه أو تضيفله ميزات جديدة بعدين.",
      },
      {
        icon: FaHeadset,
        title: "تواصل مباشر مش بيروح",
        desc: "بتكلم فريق العمل مباشرة من غير وسطاء، ورد سريع على أي استفسار في أي وقت.",
      },
      {
        icon: FaShieldAlt,
        title: "أمان وحماية بيانات",
        desc: "بنطبق أفضل معايير الأمان في كل مشروع عشان بياناتك وبيانات عملائك في أمان.",
      },
      {
        icon: FaCubes,
        title: "تقنيات حديثة فعلاً",
        desc: "بنشتغل بأحدث الأدوات والفريمووركس اللي تخلي منتجك سريع وقابل للنمو.",
      },
      {
        icon: FaTags,
        title: "أسعار واضحة من الأول",
        desc: "بتعرف هتدفع كام وعلى إيه بالظبط، من غير رسوم مخفية أو مفاجآت آخر الشهر.",
      },
    ],
  },
  en: {
    eyebrow: "Why Choose Us",
    heading: "Our work speaks first",
    subheading:
      "We don't just write code — we build products that work right from day one, and we stay with you after delivery, not just until you pay.",
    features: [
      {
        icon: FaBolt,
        title: "Real delivery speed",
        desc: "We set a clear timeline from day one and stick to it, no delays, no excuses.",
      },
      {
        icon: FaCode,
        title: "Clean, scalable code",
        desc: "Readable, organized code that's easy for anyone to extend or build on later.",
      },
      {
        icon: FaHeadset,
        title: "Direct communication",
        desc: "You talk to the team directly, no middlemen, with fast replies whenever you need us.",
      },
      {
        icon: FaShieldAlt,
        title: "Security by default",
        desc: "We apply best-practice security on every project so your data stays protected.",
      },
      {
        icon: FaCubes,
        title: "Genuinely modern stack",
        desc: "We build with current tools and frameworks that keep your product fast and scalable.",
      },
      {
        icon: FaTags,
        title: "Transparent pricing",
        desc: "You know exactly what you're paying and for what, no hidden fees, no surprises.",
      },
    ],
  },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhyChooseUs() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section
      id="why-choose-us"
      className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32"
    >
      {/* ambient background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="inline-flex items-center rounded-full bg-accent-soft px-4 py-1.5 text-lg font-semibold tracking-wide">
          {t.eyebrow}
        </span>
        <h2 className="mt-5 font-display text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
          {t.heading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {t.subheading}
        </p>
      </motion.div>

      {/* Feature grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {t.features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-line/60 bg-white/70 p-6 shadow-[0_10px_30px_rgba(15,23,42,.05)] backdrop-blur-xl transition-shadow duration-300 hover:border-accent/30 hover:shadow-[0_20px_45px_rgba(37,99,235,.14)]"
            >
              <span className="pointer-events-none absolute end-5 top-5 font-mono text-xs text-muted/40">
                {`// ${String(i + 1).padStart(2, "0")}`}
              </span>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <Icon size={18} />
              </div>

              <h3 className="mt-5 font-display text-lg font-bold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}