export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden scroll-mt-32" id='hero'>
      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      >
        <source
          src="/videos/hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* LIGHTER OVERLAY */}
      <div className="absolute inset-0 bg-black/45" />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          h-full
          flex
          items-center
          px-16
        "
      >
        <div className="max-w-2xl">
          {/* HERO */}
          <h1
            className="
                text-[4.25rem]
                lg:text-[5.25rem]
                font-bold
                tracking-[-0.07em]
                leading-[0.92]
                "
          >
            Secure Smarter.
            <br />
            Monitor Better.
          </h1>

          {/* TAGLINE */}
          <h2
            className="
                mt-7
                text-2xl
                lg:text-3xl
                font-medium
                leading-tight
            "
          >
            Know Who Enters.
            <br />
            Know What Leaves.
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
                mt-7
                max-w-xl
                text-lg
                text-white/75
                leading-relaxed
                "
          >
            AI-powered employee and vehicle
            verification for industrial security,
            access control and surveillance
            automation.
          </p>
        </div>
      </div>
    </section>
  );
}