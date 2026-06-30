"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

const [submitting, setSubmitting] = useState(false);

const [form, setForm] = useState({
  email: "",
  password: "",
});

const [errors, setErrors] = useState({
  email: "",
  password: "",
});

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=]).{8,}$/;

  const [scrolled, setScrolled] = useState(false);
  const scrollToSection = (id: string) => {
  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
};

const handleEmailChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const value = e.target.value;

  setForm((prev) => ({
    ...prev,
    email: value,
  }));

  if (!value.trim()) {
    setErrors((prev) => ({
      ...prev,
      email: "Email is required.",
    }));
    return;
  }

  if (!emailRegex.test(value.trim())) {
    setErrors((prev) => ({
      ...prev,
      email: "Enter a valid email address.",
    }));
    return;
  }

  setErrors((prev) => ({
    ...prev,
    email: "",
  }));
};

const handlePasswordChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const value = e.target.value;

  setForm((prev) => ({
    ...prev,
    password: value,
  }));

  if (!value.trim()) {
    setErrors((prev) => ({
      ...prev,
      password: "Password is required.",
    }));
    return;
  }

  if (!passwordRegex.test(value)) {
    setErrors((prev) => ({
      ...prev,
      password:
        "Password doesn't meet all requirements.",
    }));
    return;
  }

  setErrors((prev) => ({
    ...prev,
    password: "",
  }));
};

const isSignInValid =
  form.email.trim() &&
  form.password &&
  !errors.email &&
  !errors.password;

const handleLogin = async () => {
  if (!isSignInValid) return;

  setSubmitting(true);

  try {

    // backend later

    localStorage.setItem(
      "securevision-user",
      JSON.stringify({
        email: form.email,
      })
    );

    toast.success("Signed in successfully!");

    setForm({
      email: "",
      password: "",
    });

    setErrors({
      email: "",
      password: "",
    });

    router.push("/dashboard");

  } catch {

    toast.error("Unable to sign in.");

  } finally {

    setSubmitting(false);

  }
};


useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };

  window.addEventListener("scroll", handleScroll);

  return () =>
    window.removeEventListener("scroll", handleScroll);
}, []);
  return (
    <nav
  className={`
    fixed
    top-0
    left-0
    w-full
    z-50

    px-4
sm:px-6
lg:px-16

py-4
lg:py-5

    transition-all
    duration-500

    ${
      scrolled
        ? `
          backdrop-blur-xl
          bg-black/30
        `
        : `
          bg-transparent
        `
    }
    
  `}
  onMouseLeave={() => setOpen(false)}
>
      <div className="flex items-center justify-between">
  {/* LEFT SECTION */}

  <div className="flex items-center">
    {/* Logo */}
    <div className="text-2xl font-bold tracking-[-0.05em]">
      SecureVision
    </div>

    {/* Links */}
    <div className="ml-16 flex gap-10 text-[16px] text-white/65">
      <button
  onClick={() =>
    scrollToSection("showcase")
  }
>
  Product
</button>

      <button
        onClick={() =>
          scrollToSection("features")
        }
      >
        Features
      </button>

      <button
  onClick={() =>
    scrollToSection("workflow")
  }
>
  Technology
</button>
    </div>
  </div>

  {/* RIGHT SECTION */}

        {/* Login */}
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
        >
          <button
            className="
                text-[16px]
                font-normal
                text-white/55
                hover:text-white
                transition-all
                duration-300
"
          >
            Login / Create Account
          </button>

          {/* Dropdown */}
          <div
            className={`
              absolute
              right-0
              top-12
              w-[720px]
              transition-all
              duration-300
              ${
                open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-3 pointer-events-none"
              }
            `}
          >
            {/* Notch */}
            <div
              className="
                absolute
                right-14
                -top-2
                h-4
                w-4
                rotate-45
                bg-black/90
                border-l
                border-t
                border-white/15
              "
            />

            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-white/15
                bg-black/85
                backdrop-blur-2xl
                shadow-2xl
              "
            >
              <div className="grid grid-cols-2">
                {/* Left Side */}
                <div className="p-6 border-r border-white/10">
                  <h3 className="text-base font-medium mb-5 mt-2">
                    Sign In
                  </h3>

                  <input
                    type="email"
                    value={form.email}
  onChange={handleEmailChange}
                    placeholder="Email Address"
                    className="
                      w-full
                      bg-transparent
                      text-white
                      border-b
                      border-white/15
                      py-3
                      outline-none
                      mb-4
                    "
                  />
                  {errors.email && (
  <p className="mt-2 text-xs text-red-400">
    {errors.email}
  </p>
)}

                  <input
                    type="password"
                    value={form.password}
  onChange={handlePasswordChange}
                    placeholder="Password"
                    className="
                      w-full
                      bg-transparent
                      text-white
                      border-b
                      border-white/15
                      py-3
                      outline-none
                    "
                  />
                  {errors.password && (
  <p className="mt-2 text-xs text-red-400">
    {errors.password}
  </p>
)}

                  <div className="flex items-center gap-6 mt-8">
                    <button
                    onClick={handleLogin}
  disabled={!isSignInValid || submitting}
                      className="
                        px-7
                        py-2.5
                        rounded-full
                        border
                        border-white
                        hover:bg-white
                        hover:text-black
                        transition
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                      "
                    >
                      {submitting ? "Signing In..." : "Login →"}
                    </button>

                    <button className="text-sm text-white/50 hover:text-white">
                      Forgot Password?
                    </button>
                  </div>
                </div>

                {/* Right Side */}
                <div className="p-6">
                  <h3 className="text-base font-medium mb-5 mt-2">
                    Why create an account?
                  </h3>

                  <ul className="space-y-2 text-sm text-white/72 max-w-[220px]">
                    <li>✦ Access camera monitoring</li>
                    <li>✦ Manage employee enrollment</li>
                    <li>✦ View recognition logs</li>
                    <li>✦ Configure CCTV systems</li>
                  </ul>

                  <Link
  href="/register"
  className="
    mt-8
    block
    w-full
    py-3
    text-center
    rounded-full
    border
    border-white
    hover:bg-white
    hover:text-black
    transition
  "
>
  Create Account →
</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}