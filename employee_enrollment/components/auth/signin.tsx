"use client"

import { useState, type FormEvent } from "react"
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from "lucide-react"

/* ============================================================================
 *  SecureVision — Sign In / Sign Up page
 *  Standalone route at /signin. Self-contained: background, branding, and the
 *  auth card all live in this single file, separated by the comment banners
 *  below. Uses the shared fonts (Sora / Inter) and color tokens from
 *  app/layout.tsx and app/globals.css. Background: /images/securevision-bg.png
 * ========================================================================== */

/* ----------------------------------------------------------------------------
 *  Google brand mark (lucide-react has no Google icon, so it is inlined here)
 * -------------------------------------------------------------------------- */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.37 12 5.37V4.75Z"
      />
    </svg>
  )
}

/* ----------------------------------------------------------------------------
 *  GitHub brand mark (inlined; lucide-react no longer ships brand icons)
 * -------------------------------------------------------------------------- */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  )
}

/* ============================================================================
 *  PAGE COMPONENT
 * ========================================================================== */
export default function SignInPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  const isSignIn = tab === "signin"

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    console.log("[v0] SecureVision auth submit:", { tab, ...data })
  }

  return (
    <main
      className="relative flex min-h-screen w-full items-stretch bg-[#070a0d] bg-[#06090f] font-sans overflow-hidden"
      
      style={{
backgroundImage:"url('/auth/securevision-bg.png')",
backgroundPosition:"left center",
backgroundSize:"cover"
}}
    >
      {/* Dark overlay for legibility */}
      <>
  {/* Main dark overlay */}
  <div className="absolute inset-0 bg-[#020304]/55" />
    
    <div
  className="
  absolute
  inset-0
  pointer-events-none

  bg-[

radial-gradient(circle_at_22%_28%,rgba(255,255,255,.05),transparent_28%),

radial-gradient(circle_at_74%_30%,rgba(255,255,255,.025),transparent_30%),

radial-gradient(circle_at_45%_80%,rgba(255,255,255,.035),transparent_38%)

]

opacity-80
"
/>

  {/* Vignette */}
  <div
    className="
    absolute inset-0
   bg-[radial-gradient(circle_at_center,
transparent_18%,
rgba(0,0,0,.18)_45%,
rgba(0,0,0,.82)_100%)]
  "
  />

 <div
className="
absolute
inset-0
pointer-events-none

bg-[linear-gradient(

180deg,

transparent,

rgba(255,255,255,.03) 45%,

rgba(255,255,255,.06) 65%,

transparent

)]

blur-[70px]

opacity-70
"
/>

<div
className="
absolute

bottom-0

left-0

right-0

h-[220px]

bg-gradient-to-t

from-white/[0.04]

to-transparent

opacity-40
"
/>

<div
className="
absolute
right-[22%]
top-[-15%]

h-[140%]
w-[240px]

rotate-[14deg]

bg-gradient-to-b

from-white/10

via-white/[0.03]

to-transparent

blur-[90px]

opacity-50
"
/>

<div
className="
absolute

left-[14%]

top-[18%]

h-[280px]

w-[280px]

rounded-full

bg-white/[0.035]

blur-[120px]
"
/>

<div
className="
absolute

right-[12%]

top-[8%]

h-[220px]

w-[220px]

rounded-full

bg-[#22c55e]

opacity-[0.025]

blur-[120px]
"
/>

<div
className="
absolute

right-[25%]

bottom-[15%]

h-[300px]

w-[300px]

rounded-full

bg-[#22c55e]

opacity-[0.02]

blur-[160px]
"
/>

<div
className="
absolute

right-[30%]

-top-[15%]

h-[150%]

w-[220px]

rotate-[14deg]

bg-gradient-to-b

from-white/[0.05]

via-white/[0.02]

to-transparent

blur-[90px]

opacity-60
"
/>

<div
  className="
  absolute
  inset-0
  pointer-events-none

  bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,.02)_1px,transparent_2px)]

  bg-[length:180px_180px]

  opacity-[0.25]

  blur-[1px]
"
/>

<div
className="
absolute

left-0

top-0

bottom-0

w-[34%]

bg-gradient-to-r

from-black/45

to-transparent
"
/>

<div
className="
absolute

right-[18%]
top-[20%]

h-[420px]
w-[420px]

rounded-full

bg-[#22c55e]

opacity-[0.045]

blur-[160px]
"
/>

<div
className="
absolute

left-[-120px]
bottom-[-120px]

h-[520px]
w-[520px]

rounded-full

bg-white/[0.03]

blur-[180px]
"
/>


  {/* Subtle fog */}
  <div
    className="
    absolute
    inset-0
    bg-[url('/noise.png')]
    opacity-[0.04]
    mix-blend-screen
  "
  />
</>

      {/* ----------------------------------------------------------------------
       *  LEFT SIDE — branding + hero copy
       * -------------------------------------------------------------------- */}
      {/* Brand logo top-left */}
      <div className="absolute left-8 top-8 z-10 flex items-center gap-3 sm:left-12 sm:top-10">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22c55e]/15 ring-1 ring-[#22c55e]/40">
          <ShieldCheck className="h-6 w-6 text-[#22c55e]" />
        </span>
        <span className="font-heading text-2xl font-bold tracking-tight text-white">
          SecureVision
          <sup className="ml-1 text-[0.6rem] font-medium text-white/60">TM</sup>
        </span>
      </div>

      {/* Hero copy bottom-left */}
      <div className="absolute bottom-24 left-14 z-10 max-w-xl sm:bottom-16 sm:left-12">
        
        <h1 className="font-heading text-[60px] font-bold leading-[0.95]
tracking-[-0.03em]
font-black text-white sm:text-5xl lg:text-5xl">
          AI Powered
          <br />
          Surveillance System
        </h1>
        <span className="mt-5 block h-1 w-24 rounded-full bg-[#22c55e]" aria-hidden="true" />
        <p className="mt-5 text-pretty text-[17px] font-light leading-8 text-white/60 sm:text-lg">
          Created for ease of monitoring and surveillance.
        </p>
      </div>

      {/* ----------------------------------------------------------------------
       *  RIGHT SIDE — auth card
       * -------------------------------------------------------------------- */}
      <div className="relative z-20 ml-auto flex w-full translate-y-4 justify-center p-6 md:justify-end md:p-10 lg:pr-20">
        <div className="
group
relative
w-full
max-w-lg
overflow-hidden
rounded-[18px]

border
border-white/[0.035]

bg-black/70

backdrop-blur-[52px]

p-4
sm:p-6

transition-all
duration-500

hover:-translate-y-[3px]

hover:border-white/30

hover:bg-black/70

shadow-[0_20px_70px_rgba(0,0,0,.45)]
hover:shadow-[0_25px_90px_rgba(0,0,0,.60)]
" >

    <div
className="
pointer-events-none

absolute

inset-[3px]

rounded-[20px]

background: linear-gradient(
    180deg,
    rgba(15,16,18,.90) 0%,
    rgba(10,11,13,.92) 45%,
    rgba(6,7,9,.96) 100%
);

mix-blend-screen
"
/>

    {/* Outer glass frame */}
<div
  className="
  pointer-events-none
  absolute
  inset-0
  rounded-[18px]

  border

  border-white/[0.025]

 shadow-[

0_40px_90px_rgba(0,0,0,.75),

0_10px_20px_rgba(0,0,0,.45),

inset_0_1px_0_rgba(255,255,255,.12)

]
"
/>

<div
className="
absolute

right-[6%]

top-[14%]

h-[650px]

w-[650px]

rounded-full

bg-white/[0.018]

blur-[220px]
"
/>

<div
className="
pointer-events-none

absolute

-top-6
-left-6

h-24
w-24

rounded-full

bg-[radial-gradient(circle,rgba(255,255,255,.22)_0%,rgba(255,255,255,.08)_35%,transparent_72%)]

blur-xl

opacity-70
"
/>

<div
className="
pointer-events-none

absolute

-top-5
-right-5

h-20
w-20

rounded-full

bg-[radial-gradient(circle,rgba(255,255,255,.12)_0%,transparent_72%)]

blur-lg

opacity-45
"
/>

<div
className="
pointer-events-none

absolute

-bottom-7
-left-6

h-16
w-16

rounded-full

bg-[radial-gradient(circle,rgba(255,255,255,.05)_0%,transparent_70%)]

blur-lg

opacity-30
"
/>

<div
className="
pointer-events-none

absolute

-bottom-8
-right-8

h-20
w-20

rounded-full

bg-[radial-gradient(circle,rgba(255,255,255,.08)_0%,transparent_72%)]

blur-xl

opacity-35
"
/>

<div
className="
pointer-events-none
absolute

left-[1px]
top-6
bottom-6

w-[2px]

rounded-full

bg-gradient-to-b
from-transparent
via-white/35
to-transparent

blur-[2px]

opacity-80
"
/>

<div
className="
pointer-events-none
absolute

right-0
top-8
bottom-8

w-[5px]

rounded-full

bg-gradient-to-b
from-transparent
via-white/22
to-transparent

blur-[2px]

opacity-60
"
/>

<div
className="
pointer-events-none

absolute

inset-[2px]

rounded-[18px]

shadow-[inset_0_0_40px_rgba(255,255,255,.03)]
"
/>

    <div
className="
pointer-events-none
absolute
inset-0
rounded-[18px]

opacity-0

transition-opacity
duration-500

group-hover:opacity-100

shadow-[0_0_35px_rgba(34,197,94,.18)]
"
/>

<div
className="
pointer-events-none
absolute

inset-0

rounded-[18px]

ring-1

ring-white/10

shadow-[inset_0_1px_0_rgba(255,255,255,.18)]
"
/>

<div
className="
pointer-events-none

absolute

top-0

left-8

right-8

h-[2px]

rounded-full

bg-gradient-to-r

from-transparent

via-white/70

to-transparent

opacity-60
"
/>


<div
className="
pointer-events-none

absolute

inset-0

rounded-[18px]

overflow-hidden
">

</div>

<div
className="
pointer-events-none

absolute

inset-0

rounded-[18px]

before:absolute
before:inset-0

before:rounded-3xl

before:bg-[linear-gradient(115deg,rgba(255,255,255,.12)_0%,transparent_18%,transparent_60%,rgba(255,255,255,.04)_100%)]

before:content-['']
"
/>

<div
className="
pointer-events-none

absolute

-top-28

-left-24

group-hover:left-[-40px]

transition-all

duration-1000

ease-out

h-[540px]

w-[180px]

rotate-[22deg]

bg-gradient-to-r

from-white/10

via-white/4

to-transparent

blur-[30px]

opacity-60
"
/>


          {/* Card content sits above the sheen layers */}
          <div className="relative">
          {/* Tabs */}
          <div className="grid grid-cols-2 text-center text-base font-medium">
            <button
              type="button"
              onClick={() => setTab("signin")}
              className={`relative pb-3 transition-colors ${
                isSignIn ? "text-[#22c55e]" : "text-white/50 hover:text-white/80"
              }`}
            >
              Sign In
              {isSignIn && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gradient-to-r
from-[#3DE37B]
to-[#2BCF69] shadow-[0_8px_25px_rgba(34,197,94,.18)] hover:shadow-[0_12px_30px_rgba(34,197,94,.30)]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setTab("signup")}
              className={`relative pb-3 transition-colors ${
                !isSignIn ? "text-[#22c55e]" : "text-white/50 hover:text-white/80"
              }`}
            >
              Sign Up
              {!isSignIn && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gradient-to-r
from-[#3DE37B]
to-[#2BCF69] shadow-[0_8px_25px_rgba(34,197,94,.18)] hover:shadow-[0_12px_30px_rgba(34,197,94,.30)]" />
              )}
            </button>
          </div>
          <div className="mb-7 h-px w-full bg-white/10" />

          {/* Heading */}
          <h2 className="font-heading text-2xl font-bold text-white">
            {isSignIn ? "Welcome back" : "Create account"}
          </h2>
          <p className="mt-1.5 text-sm text-white/55">
            {isSignIn
              ? "Sign in to your account to continue"
              : "Set up your account to get started"}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            {!isSignIn && (
              <Field label="Full Name">
                <FieldInput name="fullName" type="text" placeholder="Jane Doe" icon={<Mail className="h-[18px] w-[18px]" />} />
              </Field>
            )}

            <Field label="Email Address">
              <FieldInput
                name="email"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="h-[18px] w-[18px]" />}
              />
            </Field>

            <Field label="Password">
              <div className="group relative flex items-center rounded-lg border border-white/10 bg-[#0d1115]/70 transition-colors focus-within:border-[#22c55e] focus-within:shadow-[0_0_0_3px_rgba(34,197,94,0.15)] hover:border-white/25">
                <span className="pointer-events-none absolute left-3.5 text-white/40">
                  <Lock className="h-[18px] w-[18px]" />
                </span>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-[#070809]/70 py-3 pl-11 pr-11 text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 text-white/40 transition-colors hover:text-white/80"
                >
                  {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                </button>
              </div>
            </Field>

            {!isSignIn && (
              <Field label="Confirm Password">
                <FieldInput
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="h-[18px] w-[18px]" />}
                />
              </Field>
            )}

            {isSignIn && (
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-white/65">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-white/30 bg-transparent accent-[#22c55e]"
                  />
                  Remember me
                </label>
                <button type="button" className="text-sm font-medium text-[#22c55e] transition-colors hover:text-[#34d97f]">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="mt-1 w-full rounded-xl bg-[#22c55e] py-3 text-sm font-semibold text-[#06210f] transition-all duration-200 hover:bg-[#2ee06f] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"
            >
              {isSignIn ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/45">or continue with</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.03] py-3 text-sm font-medium text-white transition-all duration-200 hover:border-[#22c55e]/60 hover:bg-white/[0.06] hover:shadow-[0_0_18px_rgba(34,197,94,0.35)]"
            >
              <GoogleIcon className="h-5 w-5" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.03] py-3 text-sm font-medium text-white transition-all duration-200 hover:border-[#22c55e]/60 hover:bg-white/[0.06] hover:shadow-[0_0_18px_rgba(34,197,94,0.35)]"
            >
              <GithubIcon className="h-5 w-5" />
              GitHub
            </button>
          </div>

          {/* Footer */}
          <p className="mt-7 text-center text-sm text-white/55">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setTab(isSignIn ? "signup" : "signin")}
              className="font-semibold text-[#22c55e] transition-colors hover:text-[#34d97f]"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
          </div>
        </div>
      </div>
    </main>
  )
}

/* ============================================================================
 *  SMALL FORM HELPERS
 * ========================================================================== */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white/80">{label}</label>
      {children}
    </div>
  )
}

function FieldInput({
  name,
  type,
  placeholder,
  icon,
}: {
  name: string
  type: string
  placeholder: string
  icon: React.ReactNode
}) {
  return (
    <div className="relative flex items-center rounded-lg border border-white/10 bg-[#070809]/70 transition-colors focus-within:border-[#22c55e] focus-within:shadow-[0_0_0_3px_rgba(34,197,94,0.15)] hover:border-white/25">
      <span className="pointer-events-none absolute left-3.5 text-white/40">{icon}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35"
      />
    </div>
  )
}
