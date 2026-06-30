"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DashboardShowcase() {
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
  });

  const handleMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width;

    const y =
      (e.clientY - rect.top) / rect.height;

    setRotation({
      x: (0.5 - y) * 8,
      y: (x - 0.5) * 8,
    });
  };

  return (
    <section className="bg-black py-28 scroll-mt-32" id='showcase'>

      {/* Divider */}
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
      <div className="text-center mb-20 px-8">

        <p
          className="
            uppercase
            tracking-[0.3em]
            text-sm
            text-white/40
            mb-5
          "
        >
          PRODUCT SHOWCASE
        </p>

        <h2
          className="
            text-5xl
            md:text-6xl
            font-bold
            tracking-[-0.04em]
            leading-[0.95]
          "
        >
          See SecureVision
          <br />
          In Action.
        </h2>

        <p
          className="
            mt-6
            text-lg
            text-white/60
            max-w-2xl
            mx-auto
          "
        >
          Monitor employees, vehicles,
          access logs and security events
          from one unified dashboard.
        </p>

      </div>

      {/* Dashboard Area */}
      <div className="max-w-6xl mx-auto px-8">

        <motion.div
          onMouseMove={handleMove}
          onMouseLeave={() =>
            setRotation({ x: 0, y: 0 })
          }
          animate={{
            rotateX: rotation.x,
            rotateY: rotation.y,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
          className="
            relative

            overflow-hidden

            rounded-[36px]

            border
            border-zinc-800

            bg-zinc-950

            shadow-[0_50px_120px_rgba(0,0,0,0.8)]
          "
        >

          {/* Glow */}
          <div
            className="
              absolute
              -top-20
              right-0

              h-96
              w-96

              rounded-full

              bg-blue-500/10

              blur-3xl
            "
          />

          {/* Floating Dashboard */}
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 5.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.01,
            }}
            className="relative"
          >
          
          

            <Image
              src="/dashboard1.jpeg"
              alt="Dashboard"
              width={1400}
              height={900}
              className="
                w-full
                h-auto
                object-cover
              "
            />

            {/* Overlay */}
            <div
              className="
                absolute
                inset-0

                bg-gradient-to-t
                from-black/50
                via-transparent
                to-transparent
              "
            />

            {/* Face Verified */}
            <motion.div
  animate={{
    y: [0, -8, 0],
  }}
  whileHover={{
  scale: 1.04,
}}
  transition={{
    duration: 4.2,
    repeat: Infinity,
  }}
  className="
    absolute
    top-8
    right-8

    px-5
    py-4

    rounded-2xl

    bg-zinc-950/95

    border
    border-zinc-800

    shadow-2xl
  "
>
  <div className="flex items-center gap-2">
    <div className="h-2 w-2 rounded-full bg-green-500" />

    <span
      className="
      text-[11px]
      tracking-[0.18em]
      text-green-400
      font-semibold
      "
    >
      VERIFIED
    </span>
  </div>

  <p className="mt-3 text-sm font-medium">
    Employee #204
  </p>

  <p className="text-xs text-white/45 mt-1">
    2 seconds ago
  </p>
</motion.div>

            {/* Vehicle Matched */}
            <div className="flex items-center gap-2">
  <div className="h-2 w-2 rounded-full bg-blue-500" />

  <span
    className="
    text-[11px]
    tracking-[0.18em]
    text-blue-400
    font-semibold
    "
  >
    VEHICLE MATCH
  </span>
</div>

<p className="mt-3 text-sm font-medium">
  WB02AB1234
</p>

<p className="text-xs text-white/45 mt-1">
  Authorized Exit
</p>

            {/* CCTV Active */}
            <div className="flex items-center gap-2">
  <div className="h-2 w-2 rounded-full bg-orange-500" />

  <span
    className="
    text-[11px]
    tracking-[0.18em]
    text-orange-400
    font-semibold
    "
  >
    LIVE CAMERA
  </span>
</div>

<p className="mt-3 text-sm font-medium">
  Camera 07
</p>

<p className="text-xs text-white/45 mt-1">
  Monitoring Active
</p>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}