import { Analytics } from "@vercel/analytics/next";
import { ShieldCheck } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="relative flex h-screen w-full items-stretch justify-end bg-cover bg-center"
      style={{
        backgroundImage: "url('/auth/securevision-bg.png')",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-[#0a1422]/40 md:bg-transparent"
        aria-hidden="true"
      />


      {/* Logo */}
      <div className="absolute left-6 top-6 z-10 flex items-center gap-2.5 sm:left-12 sm:top-10">
        <ShieldCheck className="h-7 w-7 text-[#39ff88] drop-shadow-[0_0_8px_rgba(57,255,136,0.6)]" />

        <span className="font-heading text-xl font-bold tracking-tight text-white">
          SecureVision
          <sup className="ml-0.5 text-[0.6rem] font-medium text-[#39ff88]">
            TM
          </sup>
        </span>
      </div>

      {/* Hero Text */}
      <div className="absolute bottom-10 left-6 z-10 max-w-lg sm:bottom-14 sm:left-12">
        <h1 className="font-heading text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          AI Powered Surveillance System
        </h1>

        <p className="mt-3 text-pretty text-base font-light leading-relaxed text-white/70">
          Created for ease of monitoring and surveillance.
        </p>
      </div>

      {/* Auth Content */}
      <div className="relative z-10 flex w-full items-center justify-center p-6 md:w-auto md:justify-end md:p-10 lg:pr-16">
        {children}
      </div>

      {process.env.NODE_ENV === "production" && <Analytics />}
    </main>
  );
}