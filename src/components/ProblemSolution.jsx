import { motion } from "framer-motion";
import { FaBolt, FaIdBadge, FaTruck } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const content = {
  ar: {
    eyebrow: "المشكلة والحل",
    heading: "ليه محتاج متجر محترف؟",
    problemTitle: "المشكلة",
    problem:
      "القوالب الجاهزة تخلي متجرك شبه أي متجر تاني، تبطّئه، وتسبب مشاكل في الدفع والشحن.",
    solutionTitle: "الحل",
    solution:
      "متجر بهوية خاصة، سريع، ومربوط بأنظمة الدفع والشحن السعودية من أول يوم.",
    points: [
      {
        icon: FaIdBadge,
        title: "هوية فريدة",
        desc: "تصميم وتجربة تخص براندك مش قالب مكرر.",
      },
      {
        icon: FaBolt,
        title: "أداء سريع",
        desc: "تحميل سريع يحسّن التحويل ويقلل الارتداد.",
      },
      {
        icon: FaTruck,
        title: "دفع وشحن سعودي",
        desc: "ربط سلس مع بوابات الدفع وشركات الشحن المحلية.",
      },
    ],
  },
  en: {
    eyebrow: "Problem & Solution",
    heading: "Why you need a professional store",
    problemTitle: "The problem",
    problem:
      "Ready-made templates make your store look like everyone else's, slow it down, and cause payment and shipping issues.",
    solutionTitle: "The solution",
    solution:
      "A store with a unique identity, built for speed, and connected to Saudi payment and shipping systems from day one.",
    points: [
      {
        icon: FaIdBadge,
        title: "Unique identity",
        desc: "A look and experience built for your brand — not a repeated template.",
      },
      {
        icon: FaBolt,
        title: "Fast performance",
        desc: "Quick load times that lift conversions and cut bounce rates.",
      },
      {
        icon: FaTruck,
        title: "Saudi payments & shipping",
        desc: "Smooth integration with local payment gateways and couriers.",
      },
    ],
  },
};

export default function ProblemSolution() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section
      id="problem-solution"
      className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute start-0 top-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

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
      </motion.div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-line/60 bg-white/70 p-6 shadow-[0_10px_30px_rgba(15,23,42,.05)] backdrop-blur-xl sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            {t.problemTitle}
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            {t.problem}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-3xl border border-accent/20 bg-accent-soft/50 p-6 shadow-[0_10px_30px_rgba(37,99,235,.08)] backdrop-blur-xl sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            {t.solutionTitle}
          </p>
          <p className="mt-3 text-base leading-relaxed text-ink sm:text-lg">
            {t.solution}
          </p>
        </motion.div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {t.points.map((point, i) => {
          const Icon = point.icon;
          return (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="rounded-2xl border border-line/60 bg-white/60 p-5 text-center backdrop-blur-xl"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon size={16} />
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-ink">
                {point.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {point.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
