"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Phone,
  Code2,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative bg-black overflow-hidden pt-12 pb-24 scroll-mt-32" id='support'>
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

  mb-16
  "
/>

      {/* Background Word */}

      <div
        className="
        absolute
        inset-0

        flex
        items-center
        justify-center

        pointer-events-none
        select-none
        "
      >
        <h1
          className="
          text-[10rem]
          md:text-[16rem]

          font-black

          tracking-[-0.08em]

          text-white/[0.02]
          "
        >
          SECUREVISION
        </h1>
      </div>
      

      {/* Main CTA */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
        relative
        z-10

        max-w-5xl
        mx-auto

        px-8

        text-center
        "
      >

        {/* Label */}

        <p
          className="
          uppercase

          tracking-[0.35em]

          text-sm
          text-white/40

          mb-8
          "
        >
          READY TO DEPLOY
        </p>

        {/* Heading */}

        <h2
          className="
          text-6xl
          md:text-7xl

          font-bold

          tracking-[-0.04em]
          leading-[0.95]
          "
        >
          Security Intelligence
          <br />
          For Modern Facilities
        </h2>

        {/* Description */}

        <p
          className="
          mt-10

          max-w-3xl
          mx-auto

          text-xl
          text-white/60

          leading-relaxed
          "
        >
          Employee verification, vehicle
          intelligence and real-time
          surveillance in one unified
          platform built for modern
          security teams.
        </p>

        {/* Buttons */}

        <div
          className="
          flex
          flex-col
          sm:flex-row

          justify-center

          gap-4

          mt-14
          "
        >

          <button
            className="
            px-10
            py-5

            rounded-full

            bg-white
            text-black

            font-medium

            hover:scale-105

            transition-all
            duration-300
            "
          >
            Explore Platform
          </button>

          <button
            className="
            px-10
            py-5

            rounded-full

            border
            border-white/15

            text-white/80

            hover:bg-white/5

            transition-all
            duration-300
            "
          >
            Contact Sales
          </button>

        </div>

      </motion.div>


      {/* Support Row */}

<div
  className="
  relative
  z-10

  max-w-6xl
  mx-auto

  mt-20
  "
>

  <div
    className="
    grid
    md:grid-cols-[1fr_auto_1fr_auto_1fr]

    items-center
    "
  >

    {/* Documentation */}

    <div
      className="
      text-center

      px-10
      py-6
      hover:border-white/20
hover:-translate-y-1
      flex
      flex-col
      items-center
      justify-center
      "
    >
      <FileText
        size={32}
        className="mb-5 text-white/80"
      />

      <h3
        className="
        text-xl
        font-semibold
        mb-3
        "
      >
        Documentation
      </h3>

      <p
        className="
        text-white/50
        leading-relaxed
        max-w-xs
        "
      >
        Learn how SecureVision works,
        deployment architecture and
        platform capabilities.
      </p>
    </div>

    {/* Divider */}

    <div
      className="
      hidden
      md:block

      w-px

      bg-white/10
      "
    />

    {/* Expert */}

    <div
      className="
      text-center

      px-10
      py-6
      hover:border-white/20
hover:-translate-y-1

      flex
      flex-col
      items-center
      justify-center
      "
    >
      <Phone
        size={32}
        className="mb-5 text-white/80"
      />

      <h3
        className="
        text-xl
        font-semibold
        mb-3
        "
      >
        Talk To An Expert
      </h3>

      <p
        className="
        text-white/50
        leading-relaxed
        max-w-xs
        "
      >
        Discuss deployment options,
        integrations and enterprise
        security requirements.
      </p>
    </div>

    {/* Divider */}

    <div
      className="
      hidden
      md:block

      w-px

      bg-white/10
      "
    />

    {/* API */}

    <div
      className="
      text-center

      px-10
      py-6
      hover:border-white/20
hover:-translate-y-1
      flex
      flex-col
      items-center
      justify-center
      "
    >
      <Code2
        size={32}
        className="mb-5 text-white/80"
      />

      <h3
        className="
        text-xl
        font-semibold
        mb-3
        "
      >
        Developer API
      </h3>

      <p
        className="
        text-white/50
        leading-relaxed
        max-w-xs
        "
      >
        Integrate SecureVision with
        access control, CCTV and
        surveillance systems.
      </p>
    </div>

  </div>

</div>
      </section>
  );
}
              