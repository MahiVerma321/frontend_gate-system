"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const features = [
  {
    title: "Face Recognition",
    description:
      "Identify employees in real time using AI-powered facial matching.",
    image: "/image.png",
  },
  {
    title: "Vehicle Verification",
    description:
      "Ensure personnel leave with the same vehicle they entered.",
    image: "/image2.png",
  },
  {
    title: "CCTV Integration",
    description:
      "Connect IP cameras and monitor recognition events continuously.",
    image: "/image.png",
  },
  {
    title: "Access Logs",
    description:
      "Track entries, exits and recognition history instantly.",
    image: "/image2.png",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      
      if (totalHeight <= 0) return;

      const progress = Math.min(
        Math.max(-rect.top / totalHeight, 0),
        1
      );

      const index = Math.min(
        features.length - 1,
        Math.floor(progress * features.length)
      );
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-black text-white scroll-mt-32" id='features'>
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-8 pt-30 pb-24 text-center">

  {/* Small Label */}
  <p
    className={`
      ${inter.className}
      uppercase
      tracking-[0.35em]
      text-sm
      text-zinc-500
      mb-8
    `}
  >
    OUR PLATFORM
  </p>

  {/* Main Heading */}
  <h2
    className={`
      ${inter.className}
      text-3xl md:text-5xl
      font-semibold
      tracking-[-0.04em]
      leading-[1.05]
      max-w-5xl
      mx-auto
    `}
  >
    KNOW WHO ENTERS. KNOW WHAT LEAVES.
  </h2>

  {/* Subheading */}
  <p
    className={`
      mt-8
      text-zinc-400
      text-lg md:text-xl
      max-w-3xl
      mx-auto
      leading-relaxed
    `}
  >
    AI-powered employee verification, vehicle validation,
    and surveillance intelligence in one unified platform.
  </p>

</div>

      {/* Scroll Story */}
      <div
        ref={sectionRef}
        className="relative h-[500vh]"
      >
        <div className="sticky top-0 h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full px-8 grid lg:grid-cols-[0.75fr_1.25fr] gap-8">

            {/* LEFT SIDE */}
            <div className="flex flex-col justify-center">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="border-b border-zinc-900 py-6"
                >
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeBar"
                      className="
                        absolute
                        left-0
                        top-10
                        w-[2px]
                        h-16
                        bg-white
                        rounded-full
                      "
                    />
                  )}
                  <motion.h3
                    animate={{
                      opacity:
                        activeIndex === index ? 1 : 0.45,
                    }}
                    transition={{ duration: 0.35 }}
                    className={`
                      ${inter.className}
                      text-2xl md:text-3xl
                      font-semibold
                      tracking-tight
                      transition-all
                      duration-500
                      ${
                        activeIndex === index
                          ? "text-white"
                          : "text-zinc-600"
                      }
                    `}
                  >
                    {feature.title}
                  </motion.h3>

                  <motion.div
                    initial={false}
                    animate={{
                      height:
                        activeIndex === index
                          ? "auto"
                          : 0,
                      opacity:
                        activeIndex === index
                          ? 1
                          : 0,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="overflow-hidden"
                  >
                    <p
                      className="
                      mt-5
                      text-zinc-400
                      text-[18px]
                      leading-relaxed
                      max-w-md
                    "
                    >
                      {feature.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center">
  <div
    className="
      relative
      w-full
      h-[900px]
      overflow-hidden
    "
  >
    {features.map((feature, index) => {
      const isPrev = index === activeIndex - 1;
      const isActive = index === activeIndex;
      const isNext = index === activeIndex + 1;

      if (!isPrev && !isActive && !isNext) return null;

      return (
        <motion.div
          key={index}
          layout
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          animate={{
            y: isPrev
              ? -250
              : isActive
              ? 0
              : 250,

            scale: isActive ? 1 : 0.82,

            opacity: isActive ? 1 : 0.65,
          }}
          style={{
            zIndex: isActive ? 20 : 10,
          }}
          className="
            absolute
            left-0
            right-0
            top-1/2
            -translate-y-1/2
            flex
            justify-center
          "
        >
          <div
            className={`
              overflow-hidden
              rounded-[28px]
              shadow-[0_30px_100px_rgba(0,0,0,0.4)]
              transition-all
              duration-700

              ${
                isActive
                  ? "w-full h-[560px]"
                  : "w-[92%] h-[250px]"
              }
            `}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="
                w-full
                h-full
                object-cover
              "
            />
          </div>
        </motion.div>
      );
    })}

    {/* top fade */}
    <div
      className="
        absolute
        top-0
        left-0
        right-0
        h-32
        pointer-events-none
        bg-gradient-to-b
        from-black
        via-black/80
        to-transparent
      "
    />

    {/* bottom fade */}
    <div
      className="
        absolute
        bottom-0
        left-0
        right-0
        h-32
        pointer-events-none
        bg-gradient-to-t
        from-black
        via-black/80
        to-transparent
      "
    />
  </div>
</div>

          </div>
        </div>
      </div>
    </section>
  );
}