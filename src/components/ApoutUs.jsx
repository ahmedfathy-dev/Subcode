import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const content = {
  ar: {
    eyebrow: "من نحن",
    title: "نبني برمجيات تستحق أن تُبنى",
    subtitle:
      "شركة برمجة متخصصة في تصميم وتطوير المنتجات الرقمية، من الفكرة الأولى وحتى الإطلاق ومتابعة ما بعد الإطلاق. فريقنا يجمع بين الهندسة الدقيقة والتصميم الواعي ليخرج منتج يشتغل صح ويحس المستخدم بيه.",
    stats: [
      { value: 120, suffix: "+", label: "مشروع تم تسليمه" },
      { value: 50, suffix: "+", label: "عميل حول العالم" },
      { value: 8, suffix: "", label: "سنوات خبرة" },
      { value: 24, suffix: "/7", label: "دعم فني مستمر" },
    ],
    valuesTitle: "إيه اللي بيميزنا",
    values: [
      {
        icon: "🎯",
        title: "دقة في التنفيذ",
        desc: "كل سطر كود بيتكتب بهدف واضح، ومراجعة مستمرة لضمان جودة المنتج النهائي.",
      },
      {
        icon: "⏱️",
        title: "التزام بالمواعيد",
        desc: "بنخطط لكل مرحلة بوضوح، وبنسلم في الوقت المتفق عليه من غير مفاجآت.",
      },
      {
        icon: "🤝",
        title: "شفافية كاملة",
        desc: "تحديثات دورية ومتابعة مباشرة مع العميل في كل خطوة من خطوات المشروع.",
      },
      {
        icon: "🧠",
        title: "حلول ذكية",
        desc: "بنفكر في المشكلة قبل الحل، عشان نطلعلك بأفضل تقنية تناسب احتياجك فعلاً.",
      },
    ],
  },

  en: {
    eyebrow: "About Us",
    title: "We build software worth building",
    subtitle:
      "A software development company crafting digital products from the first idea through launch and beyond. Our team blends precise engineering with thoughtful design to ship products that work well and feel right.",
    stats: [
      { value: 120, suffix: "+", label: "Projects delivered" },
      { value: 50, suffix: "+", label: "Clients worldwide" },
      { value: 8, suffix: "", label: "Years of experience" },
      { value: 24, suffix: "/7", label: "Ongoing support" },
    ],
    valuesTitle: "What sets us apart",
    values: [
      {
        icon: "🎯",
        title: "Precision in execution",
        desc: "Every line of code is written with intent, backed by continuous review to keep quality high.",
      },
      {
        icon: "⏱️",
        title: "On-time delivery",
        desc: "We plan every phase clearly and deliver on schedule, no surprises along the way.",
      },
      {
        icon: "🤝",
        title: "Full transparency",
        desc: "Regular updates and direct communication with you at every stage of the project.",
      },
      {
        icon: "🧠",
        title: "Smart solutions",
        desc: "We understand the problem before the solution, so you get the right technology for your real need.",
      },
    ],
  },
};

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  const start = () => {
    if (done) return;
    setDone(true);

    let current = 0;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, stepTime);
  };

  return (
    <motion.span
      onViewportEnter={start}
      viewport={{ once: true, margin: "-50px" }}
      className="font-display text-4xl sm:text-5xl font-bold text-ink"
    >
      {count}
      {suffix}
    </motion.span>
  );
}

export default function AboutUs() {
  const { language } = useLanguage();
  const t = content[language];
  const isAr = language === "ar";

  return (
    <section id="about" className="py-10 sm:py-20 lg:py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Header */}
        <div
          className={`mx-auto max-w-3xl ${
            isAr ? "text-center" : "text-center"
          }`}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-accent-soft px-4 py-1.5 text-2xl font-semibold text-ink"
          >
            {t.eyebrow}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink"
          >
            {t.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg leading-8 text-muted"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Stats */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-4">
          {t.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/40 bg-white/70 p-6 sm:p-8 text-center shadow-[0_20px_50px_rgba(37,99,235,.08)] backdrop-blur-xl"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-sm sm:text-base text-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 sm:mt-28 text-center font-display text-2xl sm:text-3xl font-bold text-ink"
        >
          {t.valuesTitle}
        </motion.h3>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{
                y: -8,
                boxShadow: "0 30px 70px rgba(37,99,235,.16)",
              }}
              className="rounded-3xl border border-white/40 bg-white/80 p-6 sm:p-8 shadow-[0_20px_50px_rgba(37,99,235,.08)] backdrop-blur-xl transition-shadow"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-2xl"
              >
                {item.icon}
              </motion.div>

              <h4 className="mt-6 font-display text-xl font-bold text-ink">
                {item.title}
              </h4>

              <p className="mt-3 text-sm sm:text-base leading-7 text-muted">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}