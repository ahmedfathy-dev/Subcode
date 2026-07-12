"use client";

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
    title: "حوّل فكرتك إلى نظام ناجح",
    description:
      "نصمم حلولًا رقمية حديثة تجمع بين الأداء، السرعة، وتجربة مستخدم استثنائية تساعد مشروعسواء كنت شركة ناشئة، مؤسسة، أو رائد أعمال، نحن جاهزون لتطوير حلول برمجية مخصصة تناسب احتياجاتك وتساعدك على النمو ",
  },
  en: {
    title: "Turn your idea into a successful system",
    description:
      "Whether you're a startup, enterprise, or entrepreneur, we're ready to build custom software solutions tailored to your needs and help you grow.",
  },
};

const images = [
  "/images/hero/image1.png",
  "/images/hero/image2.png",
  "/images/hero/image3.png",
  "/images/hero/image4.png",
  "/images/hero/image5.jpg",
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
    <section id="top" className="relative h-[230vh] sm:h-[280vh] lg:h-[350vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-14 md:mb-16 text-center"
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
        </motion.div>

        {/* الكاروسيل */}
        <div
          className="relative flex h-[160px] sm:h-[240px] md:h-[340px] lg:h-[460px] w-full items-center justify-center"
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