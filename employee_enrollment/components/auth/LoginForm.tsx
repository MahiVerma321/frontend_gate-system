"use client";

import Link from "next/link";

export default function LoginForm() {
  return (
    <div>

      {/* Heading */}

      <p
        className="
        text-white/40
        uppercase
        tracking-[0.3em]
        text-xs
        mb-4
        "
      >
        Welcome Back
      </p>
      <div
  className="
  flex
  gap-8

  mb-12

  border-b
  border-white/10
  "
>
  <Link
    href="/login"
    className="
    pb-4

    text-sm

    tracking-[0.25em]

    text-white

    border-b-2
    border-blue-500
    "
  >
    SIGN IN
  </Link>

  <Link
    href="/register"
    className="
    pb-4

    text-sm

    tracking-[0.25em]

    text-white/40

    hover:text-white

    transition
    "
  >
    CREATE ACCOUNT
  </Link>
</div>

      <h2
        className="
        text-4xl
        font-bold
        tracking-tight
        mb-12
        "
      >
        Sign In
      </h2>

      {/* Form */}

      <form className="space-y-10">

        {/* Email */}

        <div>
          <label
            className="
            block
            text-sm
            text-white/60
            mb-3
            "
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="
            w-full

            bg-transparent

            border-b
            border-white/15

            pb-3

            text-white

            outline-none

            focus:border-blue-500

            transition-all
            "
          />
        </div>

        {/* Password */}

        <div>
          <label
            className="
            block
            text-sm
            text-white/60
            mb-3
            "
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="
            w-full

            bg-transparent

            border-b
            border-white/15

            pb-3

            text-white

            outline-none

            focus:border-blue-500

            transition-all
            "
          />
        </div>

        {/* Options */}

        <div
          className="
          flex
          items-center
          justify-between

          text-sm
          "
        >
          <label
            className="
            flex
            items-center
            gap-3

            text-white/60
            "
          >
            <input
              type="checkbox"
              className="
              accent-blue-500
              "
            />
            Remember Me
          </label>

          <button
            type="button"
            className="
            text-white/50
            hover:text-white

            transition
            "
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}

        <button
          type="submit"
          className="
          w-full

          py-4

          border
          border-white/20

          uppercase
          tracking-[0.25em]

          text-sm

          hover:border-blue-500
          hover:text-blue-400

          transition-all
          duration-300
          "
        >
          Sign In
        </button>

      </form>

      {/* Footer */}

      <div
        className="
        mt-12

        text-center

        text-white/50
        text-sm
        "
      >
        Don't have an account?{" "}
        <Link
          href="/register"
          className="
          text-white

          hover:text-blue-400

          transition
          "
        >
          Create Account
        </Link>
      </div>

    </div>
  );
}