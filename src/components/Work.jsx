import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useLanguage } from "../context/LanguageContext";

const projects = [
  {
    id: "nova",
    img: "/images/hero/image2.png",
    ar: {
      tag: "منصة تجارة إلكترونية",
      title: "Nova متجر",
      desc: "منصة بيع أونلاين بأداء عالي وتجربة دفع سلسة زادت التحويلات بشكل ملحوظ.",
    },
    en: {
      tag: "E-commerce Platform",
      title: "Nova Store",
      desc: "A high-performance online store with a smooth checkout that noticeably lifted conversions.",
    },
  },
  {
    id: "flowlist",
    img: "/images/hero/image3.png",
    ar: {
      tag: "تطبيق إدارة مشاريع",
      title: "Flowlist",
      desc: "أداة لإدارة المهام والفرق، مبنية بواجهة بسيطة وسريعة الاستجابة.",
    },
    en: {
      tag: "Project Management App",
      title: "Flowlist",
      desc: "A task and team management tool built with a simple, fast, responsive interface.",
    },
  },
  {
    id: "eduspark",
    img: "/images/hero/image1.png",
    ar: {
      tag: "منصة تعليمية",
      title: "EduSpark",
      desc: "نظام كورسات أونلاين مع متابعة تقدم الطالب وشهادات إتمام تلقائية.",
    },
    en: {
      tag: "Learning Platform",
      title: "EduSpark",
      desc: "An online course system with student progress tracking and automatic certificates.",
    },
  },
  {
    id: "bookit",
    img: "/images/hero/image6.jpg",
    ar: {
      tag: "تطبيق حجوزات",
      title: "BookIt",
      desc: "نظام حجز مواعيد للعيادات والصالونات مع تذكيرات تلقائية عبر واتساب.",
    },
    en: {
      tag: "Booking App",
      title: "BookIt",
      desc: "An appointment booking system for clinics and salons with automatic WhatsApp reminders.",
    },
  },
];

const content = {
  ar: {
    eyebrow: "أعمالنا",
    heading: "أهم مشاريعنا",
    subheading:
      "مجموعة مختارة من المشاريع اللي بنينها مؤخرًا، من فكرة على الورق لمنتج شغال بيستخدمه ناس حقيقيين.",
    cta: "شوف المشروع",
  },
  en: {
    eyebrow: "Our Work",
    heading: "Featured Projects",
    subheading:
      "A selected set of projects we've shipped recently, from an idea on paper to a real product real people use.",
    cta: "View project",
  },
};

function ProjectCard({ project, index, cta, language }) {
  const cardRef = useRef(null);

  // cursor-follow tilt — springed so it feels physical, not jittery
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springX = useSpring(mx, { stiffness: 150, damping: 18 });
  const springY = useSpring(my, { stiffness: 150, damping: 18 });

  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);
  const glowX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(springY, [0, 1], ["0%", "100%"]);

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  const isAr = language === "ar";
  const isFirstOrThird = index % 2 === 0;

  // Arabic: 1st/3rd image RIGHT (keep), 2nd/4th image LEFT (keep images left — only text on right)
  // English: opposite of Arabic
  const imageOnLeft = isAr ? !isFirstOrThird : isFirstOrThird;

  const imageBlock = (
    <div
      className="relative w-full shrink-0 sm:w-2/5 lg:w-[30%]"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-[28px] border border-line/60 shadow-[0_20px_50px_rgba(15,23,42,.10)]"
      >
        <motion.div
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          style={{ originX: imageOnLeft ? 0 : 1 }}
          className="absolute inset-0 z-10 bg-accent"
        />

        <img
          src={project.img}
          alt={project.title}
          className="h-[240px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] sm:h-[290px] lg:h-[340px]"
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(220px circle at ${glowX} ${glowY}, rgba(255,255,255,.28), transparent 70%)`,
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </motion.div>
    </div>
  );

  const textBlock = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, delay: 0.25 }}
      dir={isAr ? "rtl" : "ltr"}
      className={`w-full max-w-md text-center lg:w-[55%] lg:max-w-none ${
        imageOnLeft ? "lg:text-end" : "lg:text-start"
      }`}
    >
      <span className="inline-flex items-center rounded-full bg-accent-soft px-3.5 py-1 text-xs font-semibold tracking-wide text-accent">
        {project.tag}
      </span>
      <h3 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
        {project.title}
      </h3>
      <p
        className={`mx-auto mt-3 text-sm leading-relaxed text-muted sm:text-base ${
          imageOnLeft ? "lg:ml-auto lg:mr-0" : "lg:mr-auto lg:ml-0"
        }`}
      >
        {project.desc}
      </p>

      <motion.a
        href="#"
        whileHover={{ gap: "0.75rem" }}
        className={`mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-ink transition-colors duration-300 hover:text-accent ${
          imageOnLeft ? "lg:justify-end" : "lg:justify-start"
        }`}
      >
        {cta}
        <FaArrowUpRightFromSquare size={12} />
      </motion.a>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      dir="ltr"
      className="flex w-full flex-col items-center gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
    >
      {imageOnLeft ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </motion.div>
  );
}

export default function Work() {
  const { language } = useLanguage();
  const t = content[language];

  const localizedProjects = projects.map((project) => ({
    id: project.id,
    img: project.img,
    ...project[language],
  }));

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-4 py-0">
      {/* ambient background accents, consistent with the rest of the page */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute end-0 top-1/3 h-72 w-72 rounded-full bg-sky-400/5 blur-3xl" />
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
        <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
          {t.heading}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          {t.subheading}
        </p>
      </motion.div>

      <div className="mt-10 flex flex-col gap-10 sm:gap-14 lg:gap-16">
        {localizedProjects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            cta={t.cta}
            language={language}
          />
        ))}
      </div>
    </section>
  );
}