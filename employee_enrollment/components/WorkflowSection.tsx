"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  UserRound,
  Camera,
  ScanFace,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const cards = [
  {
    image: "/enrollment.jpeg",
    title: "Employee Enrollment",
    description:
      "Register employees securely with facial embeddings and identity records.",
  },
  {
    image: "/enrollment.jpeg",
    title: "Live Monitoring",
    description:
      "Connect CCTV streams and continuously monitor activity in real time.",
  },
  {
    image: "/enrollment.jpeg",
    title: "AI Recognition",
    description:
      "Identify people and vehicles instantly using intelligent recognition.",
  },
  {
    image: "/enrollment.jpeg",
    title: "Security Insights",
    description:
      "Review access history, alerts and activity logs through one dashboard.",
  },
];

export default function WorkflowSection() {
  const [current, setCurrent] = useState(1);

  const nextCard = () => {
    setCurrent((prev) =>
      prev === cards.length - 1 ? 0 : prev + 1
    );
  };

  const prevCard = () => {
    setCurrent((prev) =>
      prev === 0 ? cards.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextCard();
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-black pt-12 pb-8 overflow-hidden scroll-mt-32" id='workflow'>
      <div
  className="
  w-full
  max-w-6xl
  mx-auto
  h-px
  bg-gradient-to-r
  from-transparent
  via-white/10
  to-transparent
  mb-24
  "
/>

      {/* Heading */}

      <div className="text-center mb-16 px-8">

        <p
          className="
          uppercase
          tracking-[0.3em]
          text-white/40
          text-sm
          mb-6
          "
        >
          HOW SECUREVISION WORKS
        </p>

        <h2
          className="
          text-5xl
          md:text-6xl
          font-bold
          tracking-[-0.03em]
          leading-[1.1]
          "
        >
          Security Intelligence
          <br />
          In Motion.
        </h2>

        <p
          className="
          mt-6
          text-white/60
          text-lg
          max-w-2xl
          mx-auto
          "
        >
          From enrollment to recognition,
          every step is designed to provide
          complete visibility and control.
        </p>
      </div>

      {/* Carousel */}

      <div className="relative max-w-7xl mx-auto">

        {/* Left */}

        <button
          onClick={prevCard}
          className="
          absolute
          left-2
          md:left-6
          top-1/2
          -translate-y-1/2
          z-50

          h-14
          w-14

          flex
          items-center
          justify-center

          rounded-full

          border
          border-white/10

          bg-white/5

          backdrop-blur-xl

          hover:scale-110
          hover:border-blue-400/30

          transition-all
          duration-300
          "
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right */}

        <button
          onClick={nextCard}
          className="
          absolute
          right-2
          md:right-6
          top-1/2
          -translate-y-1/2
          z-50

          h-14
          w-14

          flex
          items-center
          justify-center

          rounded-full

          border
          border-white/10

          bg-white/5

          backdrop-blur-xl

          hover:scale-110
          hover:border-blue-400/30

          transition-all
          duration-300
          "
        >
          <ChevronRight size={24} />
        </button>

        {/* Cards */}

        <div className="overflow-hidden px-24">

          <motion.div
            animate={{
              x: `calc(50% - ${current * 420}px - 210px)`,
            }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 18,
            }}
            className="
            flex
            gap-8
            "
          >
            {cards.map((card, index) => {

              const isActive = index === current;

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -8,
                  }}
                  className={`
                  group
                  relative

                  flex-shrink-0

                  w-[380px]
                  h-[500px]

                  rounded-[36px]
                  cursor-pointer

                  overflow-hidden

                  border

                  ${
                    isActive
                      ? "border-white/15 scale-100 opacity-100"
                      : "border-white/5 scale-95 opacity-50"
                  }

                  bg-gradient-to-br
                  from-white/[0.06]
                  to-white/[0.02]

                  backdrop-blur-2xl

                  shadow-[0_40px_120px_rgba(0,0,0,0.65)]

                  transition-all
                  duration-500
                  `}
                >

                  {/* Glow */}

                  <div
                    className="
                    absolute
                    inset-0

                    bg-gradient-to-br
                    from-white/[0.05]
                    via-transparent
                    to-transparent
                    "
                  />

                  {/* Orb */}

                  <div
                    className="
                    absolute
                    -top-16
                    right-0

                    h-64
                    w-64

                    rounded-full

                    bg-blue-500/10

                    blur-3xl
                    "
                  />

                  {/* Card Content */}

                  <div
                    className="
                    relative

                    h-full

                    flex
                    flex-col
                    "
                  >

                    {/* Icon Area */}

                    <div className="relative h-[70%] overflow-hidden">

  <Image
    src={card.image}
    alt={card.title}
    fill
    className="
      object-cover
      transition-transform
      duration-700
      group-hover:scale-110
    "
  />

  {/* Overlay */}

  <div
    className="
      absolute
      inset-0

      bg-gradient-to-t
      from-black
      via-black/30
      to-transparent
    "
  />

</div>

                    {/* Bottom Content */}

                    <div className="pb-12 px-8">

                      <h3
                        className="
                        text-center

                        text-3xl

                        font-semibold

                        tracking-[-0.03em]
                        "
                      >
                        {card.title}
                      </h3>

                      <p
                        className="
                        mt-4

                        text-center

                        text-white/60

                        leading-relaxed
                        "
                      >
                        {card.description}
                      </p>

                    </div>

                  </div>

                </motion.div>
              );
            })}
          </motion.div>

        </div>

        {/* Indicators */}

        <div className="flex justify-center gap-3 mt-10">

          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`
                rounded-full
                transition-all
                duration-300

                ${
                  current === index
                    ? "w-10 h-2 bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.7)]"
                    : "w-2 h-2 bg-white/30"
                }
              `}
            />
          ))}

        </div>

      </div>

    </section>
  );
}