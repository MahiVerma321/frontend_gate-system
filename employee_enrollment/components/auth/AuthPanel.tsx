"use client"

import { useState, type FormEvent } from "react"
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react"

type Tab = "signin" | "signup";

interface AuthPanelProps {
  initialTab?: Tab;
}

export function AuthPanel({
  initialTab = "signup",
}: AuthPanelProps) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const isSignup = tab === "signup"
  const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Wire up to your auth backend here
    console.log("[v0] submit", { tab, ...form })
  }

  return (
    <div className="group/card relative flex w-[600px] flex-col justify-center overflow-hidden rounded-none border border-white/5
    shadow-[0_0_40px_rgba(255,255,255,0.03)] bg-transparent px-10 py-14 shadow-none backdrop-blur transition-all duration-500 sm:px-12">

  {/* Card Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-90 pointer-events-none"
    style={{
      backgroundImage: "url('/auth/securevision.png')",
    }}
  />

  {/* Dark Glass Overlay */}
  <div
    className="
      absolute
      inset-0
      bg-black/10
      backdrop-blur-[2px]
      pointer-events-none
    "
  />

  {/* Existing Gradient */}
  <div
    className="
      absolute
      inset-0
      rounded-none
      bg-gradient-to-br
      from-white/[0.06]
      via-transparent
      to-transparent
      pointer-events-none
    "
  />
  <div
  className="
    absolute
    inset-0
    bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]
    pointer-events-none
  "
/>

  {/* Content */}
  <div className="relative z-10">

      {/* Tabs */}
      <div className="mb-9 flex items-center gap-5 font-heading text-2xl font-semibold tracking-tight">
        <button
          type="button"
          onClick={() => setTab("signin")}
          className={`relative pb-1.5 transition-colors ${
            !isSignup ? "text-white" : "text-white/40 hover:text-white/70"
          }`}
        >
          Sign in
          {!isSignup && (
            <span className="absolute -bottom-px left-0 h-0.5 w-full rounded-full bg-[#2563eb]
shadow-[0_0_8px_rgba(37,99,235,0.55)]" />
          )}
        </button>
        <span className="text-white/20">|</span>
        <button
          type="button"
          onClick={() => setTab("signup")}
          className={`relative pb-1.5 transition-colors ${
            isSignup ? "text-white" : "text-white/40 hover:text-white/70"
          }`}
        >
          Sign up
          {isSignup && (
            <span className="absolute -bottom-px left-0 h-0.5 w-full rounded-full bg-[#2563eb]
shadow-[0_0_8px_rgba(37,99,235,0.55)]" />
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignup && (
          
          <Field
            label="Full name"
            type="text"
            placeholder="John Doe"
            value={form.fullName}
            onChange={(v) => setForm({ ...form, fullName: v })}
          />
        )}
        <Field
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
        />
        {isSignup && (
          <Field
            label="Phone number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
          />
        )}
        <div className="flex flex-col gap-2">
  <label className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300">
    Password
  </label>

  <div className="relative">
    <Lock
  size={18}
  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
/>

    <input
      type={showPassword ? "text" : "password"}
      value={form.password}
      placeholder="••••••••"
      onChange={(e) =>
        setForm({
          ...form,
          password: e.target.value,
        })
      }
      className="
  w-full

  pl-12
  pr-12
  py-2.5

  rounded-xl

  bg-[#050b14]

  border
border-[#12304d]

  text-white

  outline-none

  transition-all
  duration-300

  placeholder:text-white/35

   hover:border-white/20
hover:bg-zinc-950/10
hover:text-white/90
hover:shadow-[0_0_22px_-4px_rgba(37,99,235,0.35)]

focus:border-zinc-600
focus:bg-charcoal-950

focus:shadow-[0_0_20px_rgba(29,78,216,0.22)]
"
    />

    <button
      type="button"
      onClick={() =>
        setShowPassword(!showPassword)
      }
      className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-white/35
      "
    >
      {showPassword ? (
        <EyeOff size={18} />
      ) : (
        <Eye size={18} />
      )}
    </button>
  </div>
</div>
        {isSignup && (
          <div className="flex flex-col gap-2">
  <label className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300">
    Confirm Password
  </label>

  <div className="relative">
    <Lock
  size={18}
  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
/>

    <input
      type={showConfirmPassword ? "text" : "password"}
      value={form.confirmPassword}
      placeholder="••••••••"
      onChange={(e) =>
        setForm({
          ...form,
          confirmPassword: e.target.value,
        })
      }
      className="
  w-full

  pl-12
  pr-12
  py-2.5

  rounded-xl

  bg-[#050b14]

border
border-[#12304d]

  text-white

  outline-none

  transition-all
  duration-300

  placeholder:text-white/35
focus:bg-charcoal-950
hover:border-white/20
hover:bg-zinc-950/10
hover:text-white/90
hover:shadow-[0_0_22px_-4px_rgba(37,99,235,0.35)]

focus:border-zinc-600
focus:bg-charcoal-950

focus:shadow-[0_0_20px_rgba(29,78,216,0.22)]
"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-white/35
      "
    >
      {showConfirmPassword ? (
        <EyeOff size={18} />
      ) : (
        <Eye size={18} />
      )}
    </button>
  </div>
</div>
        )}

        <button
          type="submit"
          className="
  w-full

  pl-12
  pr-12
  py-2.5
  mt-5

  rounded-xl
  border-white/20 

  bg-zinc-950/10

border 
border-white/20 
bg-charcoal-950

  text-white

  outline-none

  transition-all
  duration-300

  placeholder:text-white/35

hover:border-[#2563eb]
hover:bg-zinc-950/10
hover:text-white/90
hover:shadow-[0_0_22px_-4px_rgba(37,99,235,0.35)]

focus:shadow-[0_0_20px_rgba(29,78,216,0.22)]
"
        >
          {isSignup ? "REGISTER" : "LOGIN"}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-4 flex items-center gap-5">
        <span className="h-px flex-1 bg-white/15" />
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">OR</span>
        <span className="h-px flex-1 bg-white/15" />
      </div>

      {/* Continue with Google */}
      <button
        type="button"
        aria-label="Continue with Google"
        className="mt-4 flex  w-full

  pl-12
  pr-12
  py-2.5

  rounded-xl mx-auto items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 py-3.5 font-sans text-sm font-medium text-white transition-all duration-300 
        hover:border-[#2563eb]
hover:bg-zinc-950/10
hover:text-white/90
hover:shadow-[0_0_22px_-4px_rgba(37,99,235,0.35)]"
      >
        <GoogleIcon className="h-5 w-5" />
        Continue with Google
      </button>
    </div>
    </div>
  )
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string
  type: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
}) {
  const icon =
    label === "Full name" ? (
      <User size={18} />
    ) : label === "Email address" ? (
      <Mail size={18} />
    ) : label === "Phone number" ? (
      <Phone size={18} />
    ) : (
      <Lock size={18} />
    )

  return (
    <div className="flex flex-col gap-2">
      <label className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300">
        {label}
      </label>

      <div className="relative">
        <div
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-white/35
        "
        >
          {icon}
        </div>

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="
  w-full

  pl-12
  pr-12
  py-2.5

  rounded-xl

  bg-[#050b14]

  border
  border-[#12304d]

  text-white

  outline-none

  transition-all
  duration-300
            text-[15px]
            font-light
            transition-colors
            placeholder:text-white/35
            hover:border-white/20

focus:border-zinc-600
focus:bg-charcoal-950

focus:shadow-[0_0_20px_rgba(29,78,216,0.22)]
hover:bg-zinc-950/10
hover:text-white/90
hover:shadow-[0_0_22px_-4px_rgba(37,99,235,0.35)]
          "
        />
      </div>
    </div>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}

