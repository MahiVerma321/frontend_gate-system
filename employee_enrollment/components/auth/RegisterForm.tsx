"use client";

import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="w-full max-w-md">

      {/* Tabs */}

      <div className="flex gap-8 mb-12">
        <button className="text-white/60">
          Sign In
        </button>

        <button
          className="
            text-white
            border-b-2
            border-cyan-400
            pb-2
          "
        >
          Sign Up
        </button>
      </div>

      {/* Inputs */}

      <div className="space-y-8">

        <input
          placeholder="Full Name"
          className="
            w-full
            bg-transparent
            border-b
            border-white/30
            py-3
            outline-none
          "
        />

        <input
          placeholder="Email Address"
          className="
            w-full
            bg-transparent
            border-b
            border-white/30
            py-3
            outline-none
          "
        />

        <input
          placeholder="Password"
          type="password"
          className="
            w-full
            bg-transparent
            border-b
            border-white/30
            py-3
            outline-none
          "
        />
      </div>

      {/* Checkbox */}

      <label
        className="
          flex
          gap-3
          mt-8
          text-sm
          text-white/60
        "
      >
        <input type="checkbox" />
        I agree to SecureVision terms.
      </label>

      {/* Button */}

      <button
        className="
          w-full
          mt-10

          py-4

          border
          border-white/30

          tracking-[0.2em]
          uppercase

          hover:bg-cyan-500
          hover:text-black

          transition-all
          duration-300
        "
      >
        Register
      </button>
    </div>
  );
}