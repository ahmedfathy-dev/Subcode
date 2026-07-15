import {
  motion,
  useAnimationFrame,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useState, useEffect } from "react";

const content = {
  ar: {
    title: "متجرك الإلكتروني الاحترافي جاهز للبيع خلال أيام",
    description:
      "نبني متاجر مخصصة للبراندات والتجار الجادين في السعودية — مع ربط كامل لأنظمة الدفع والشحن.",
    primaryCta: "اطلب عرض سعر مجاني",
    startCta: "ابدأ الآن",
  },
  en: {
    title: "Your professional online store, ready to sell in days",
    description:
      "We build custom stores for brands and serious merchants in Saudi Arabia — with full payment and shipping integration.",
    primaryCta: "Request a free quote",
    startCta: "Start Now",
  },
};

const images = [
  "/images/hero/image1.png",
  "/images/hero/image2.png",
  "/images/hero/image3.png",
  "/images/hero/image4.png",
  "/images/hero/image2.png",
  "/images/hero/image1.png",
  "/images/hero/image2.png",
  "/images/hero/image3.png",
];

export default function Hero() {
  const { language } = useLanguage();
  const t = content[language];

  const [rotation, setRotation] = useState(0);

  useAnimationFrame((_, delta) => {
    setRotation((prev) => prev + delta * 0.018);
  });

  const { scrollYProgress } = useScroll();

  const spread = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  const horizontalMove = useTransform(
    scrollYProgress,
    [0.35, 1],
    [0, -1700]
  );

  // entrance animation driver — single motion value, staggered
  // mathematically per card so all images "arrive" nicely on load
  const entrance = useMotionValue(0);

  useEffect(() => {
    const controls = animate(entrance, 1, {
      duration: 1.1,
      ease: "easeOut",
      delay: 0.25,
    });
    return () => controls.stop();
  }, []);

  const count = images.length;
  const staggerSpan = 0.55;

  return (
    <section id="hero" className="relative h-[230vh] sm:h-[280vh] lg:h-[350vh]">
<div className="sticky top-0 flex h-[85vh] sm:h-screen flex-col items-center justify-center overflow-hidden px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-14 md:mb-16 text-center"
        >
          <h1
            className="
            mt-4 sm:mt-6 md:mt-8
            font-display
            text-xl
            sm:text-2xl
            md:text-3xl
            lg:text-4xl
            xl:text-5xl
            font-bold
            tracking-tight
            leading-tight
            text-ink
            "
          >
            {t.title}
          </h1>

          <p
            className="
            mx-auto
            mt-2
            sm:mt-3
            md:mt-4
            max-w-xs
            sm:max-w-md
            md:max-w-xl
            lg:max-w-2xl
            text-xs
            sm:text-sm
            md:text-base
            lg:text-lg
            leading-5
            sm:leading-6
            md:leading-7
            text-muted
            "
          >
            {t.description}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6 md:mt-7"
          >
            <a
              href="https://wa.me/201068389295?text=مرحباً، أريد عرض سعر مجاني لمتجر إلكتروني"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,.28)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-[0_14px_30px_rgba(37,99,235,.35)] sm:px-7 sm:py-3 sm:text-base"
            >
              {t.primaryCta}
            </a>
            <a
              href="https://wa.me/201068389295"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-accent bg-white px-6 py-2.5 text-sm font-semibold text-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft sm:px-7 sm:py-3 sm:text-base"
            >
              {t.startCta}
            </a>
          </motion.div>
        </motion.div>

        {/* الكاروسيل */}
    {/* الكاروسيل */}
        <div
          className="relative flex h-[100px] sm:h-[240px] md:h-[340px] lg:h-[460px] w-full items-center justify-center"
          style={{ perspective: "1800px" }}
        >
          <div
            className="
            relative flex h-full w-full items-center justify-center
            scale-[0.32] sm:scale-[0.48] md:scale-[0.65] lg:scale-[0.78]
            "
          >
            {images.map((img, index) => {
              const angle = rotation + index * (360 / count);
              const rad = (angle * Math.PI) / 180;

              const radius = 400;
              const circleX = Math.sin(rad) * radius;
              const lineX = (index - (count - 1) / 2) * 260;

              const spreadVal = spread.get();
              const x = circleX * (1 - spreadVal) + lineX * spreadVal;

              const circleZ = Math.cos(rad) * radius;
              const z = circleZ * (1 - spreadVal);

              const depthFactor = (z + radius) / (radius * 2);

              // raised floors so every card stays visible on first load
              const baseScale = 0.72 + depthFactor * 0.4;
              const baseOpacity = 0.55 + depthFactor * 0.45;

              // per-card staggered entrance derived from a single motion value
              const raw = entrance.get();
              const perCardDelay = (index / count) * staggerSpan;
              const localProgress = Math.min(
                Math.max(
                  (raw - perCardDelay) / (1 - staggerSpan),
                  0
                ),
                1
              );

              const finalScale = 0.5 + localProgress * (baseScale - 0.5);
              const finalOpacity = localProgress * baseOpacity;
              const finalY = (1 - localProgress) * 40;

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: baseScale * 1.15,
                    rotateY: 12,
                    rotateX: -8,
                    y: -10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                  }}
                  style={{
                    position: "absolute",
                    x: x + horizontalMove.get(),
                    y: finalY,
                    scale: finalScale,
                    opacity: finalOpacity,
                    zIndex: Math.floor(baseScale * 100),
                  }}
                >
                  <div
                    className="
                    group
                    relative
                    overflow-hidden
                    rounded-[24px]
                    sm:rounded-[28px]
                    lg:rounded-[32px]
                    border
                    border-white/30
                    bg-white/70
                    backdrop-blur-xl
                    shadow-[0_20px_60px_rgba(0,0,0,.18)]
                    transition-all
                    duration-500
                    hover:-translate-y-4
                    hover:shadow-[0_35px_80px_rgba(37,99,235,.25)]
                    "
                  >
                    <img
                      src={img}
                      alt=""
                      className="
                      h-[300px]
                      w-[230px]
                      rounded-[18px]
                      sm:rounded-[22px]
                      lg:rounded-[26px]
                      object-cover
                      transition-all
                      duration-700
                      ease-out
                      group-hover:scale-110
                      group-hover:rotate-2
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                    <div className="absolute inset-0 rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] ring-1 ring-white/20" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}