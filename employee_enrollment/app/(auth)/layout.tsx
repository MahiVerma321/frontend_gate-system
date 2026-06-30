import { ShieldCheck } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="relative flex min-h-screen w-full items-stretch bg-[#070a0d] bg-[#06090f] font-sans overflow-hidden"
      
      style={{
backgroundImage:"url('/auth/securevision-bg.png')",
backgroundPosition:"left center",
backgroundSize:"cover"
}}
    >

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

   {/* Brand logo top-left */}
      <div className="absolute left-8 top-8 z-10 flex items-center gap-3 sm:left-12 sm:top-10">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22c55e]/15 ring-1 ring-[#22c55e]/40">
          <ShieldCheck className="h-6 w-6 text-[#22c55e]" />
        </span>
        <span className="font-heading text-2xl font-bold tracking-tight text-white">
          SecureVision
          <sup className="ml-1 text-[0.6rem] font-medium text-[#39ff88]">TM</sup>
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

      <div className="relative z-20 ml-auto flex w-full translate-y-4 justify-center p-6 md:justify-end md:p-10 lg:pr-20">
    {children}
  </div>

    </main>
  );
}