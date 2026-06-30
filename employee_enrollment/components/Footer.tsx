"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden scroll-mt-32" id='footer'>

      {/* Top Divider */}

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
          text-[12rem]
          md:text-[16rem]

          font-black

          tracking-[-0.08em]

          text-white/[0.03]
          "
        >
          SECUREVISION
        </h1>
      </div>

      {/* Main Footer */}

      <div
        className="
        relative
        z-10

        max-w-7xl
        mx-auto

        px-8
        pt-24 
        pb-16

        grid
        lg:grid-cols-[1.8fr_0.7fr_0.7fr_0.7fr]
        gap-24
        "
      >

        {/* Brand */}

        <div>

          <div
            className="
            inline-flex
            items-center

            px-4
            py-2

            rounded-full

            border
            border-white/10

            text-sm
            text-white/60

            mb-8
            "
          >
            Built for Industrial Security
          </div>

          <h2
            className="
            text-3xl
            font-bold

            tracking-tight
            "
          >
            SECUREVISION™
          </h2>

          <p
            className="
            mt-5

            text-white/60
            leading-relaxed

            max-w-sm
            "
          >
            AI-powered employee verification,
            vehicle intelligence and access
            security for modern facilities.
          </p>

        </div>

        {/* Product */}

        <div>

          <h3
            className="
            text-white
            font-semibold
            mb-6
            "
          >
            Product
          </h3>

          <ul className="space-y-4 text-white/60">

            <li className="hover:text-white transition">
              Features
            </li>

            <li className="hover:text-white transition">
              Workflow
            </li>

            <li className="hover:text-white transition">
              Dashboard
            </li>

            <li className="hover:text-white transition">
              Technology
            </li>

          </ul>

        </div>

        {/* Resources */}

        <div>

          <h3
            className="
            text-white
            font-semibold
            mb-6
            "
          >
            Resources
          </h3>

          <ul className="space-y-4 text-white/60">

            <li className="hover:text-white transition">
              Documentation
            </li>

            <li className="hover:text-white transition">
              API
            </li>

            <li className="hover:text-white transition">
              GitHub
            </li>

            <li className="hover:text-white transition">
              Support
            </li>

          </ul>

        </div>

        {/* Company */}

        <div>

          <h3
            className="
            text-white
            font-semibold
            mb-6
            "
          >
            Company
          </h3>

          <ul className="space-y-4 text-white/60">

            <li className="hover:text-white transition">
              About
            </li>

            <li className="hover:text-white transition">
              Contact
            </li>

            <li className="hover:text-white transition">
              Privacy Policy
            </li>

            <li className="hover:text-white transition">
              Terms
            </li>

          </ul>

        </div>

      </div>
      

      {/* Bottom Row */}

      <div
  className="
  relative
  z-10

  max-w-7xl
  mx-auto

  px-8

  mt-24
  pb-20

  flex
flex-col
md:flex-row

items-center
justify-between

gap-4
  "
>

        <p className="text-white/40 text-sm">
          © 2026 SecureVision. All rights reserved.
        </p>

        <p className="text-white/30 text-sm">
          Made with AI-powered Security Intelligence.
        </p>

        <div className="flex items-center gap-4">
  <a
    href="https://github.com"
    target="_blank"
    className="
      h-11
      w-11
      rounded-full
      border
      border-white/10
      flex
      items-center
      justify-center
      hover:bg-white/10
      transition-all
    "
  >
    <FaGithub size={18} />
  </a>

  <a
    href="https://linkedin.com"
    target="_blank"
    className="
      h-11
      w-11
      rounded-full
      border
      border-white/10
      flex
      items-center
      justify-center
      hover:bg-white/10
      transition-all
    "
  >
    <FaLinkedin size={18} />
  </a>
</div>

      </div>

    </footer>
  );
}