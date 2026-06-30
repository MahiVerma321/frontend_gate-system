"use client";

import { useState, type FormEvent, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Field from "./Field";
import FieldInput from "./FieldInput";
import GoogleIcon from "./GoogleIcon";
import GithubIcon from "./GithubIcon";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthCardProps {
  initialTab?: "signin" | "signup";
}

export default function AuthCard({
  initialTab = "signin",
}: AuthCardProps) {
  const [tab, setTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const router = useRouter();
const [errors, setErrors] = useState({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});
  const [submitting, setSubmitting] = useState(false);

  const isSignIn = tab === "signin";

  const nameRegex =
/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=]).{8,}$/;

const passwordChecks = {
  length: form.password.length >= 8,

  uppercase: /[A-Z]/.test(form.password),

  lowercase: /[a-z]/.test(form.password),

  number: /\d/.test(form.password),

  special:
    /[@$!%*?&^#()_\-+=]/.test(form.password),
};

const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {

  e.preventDefault();

  setSubmitting(true);

  try {

    const payload = {
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    // backend later

    if (isSignIn) {

  localStorage.setItem(
    "securevision-user",
    JSON.stringify({
      fullName:
        form.fullName || "Admin",
      email: form.email,
    })
  );

  toast.success("Signed in successfully!");

  router.push("/dashboard");

} else {

  toast.success(
    "Account created successfully! Please sign in."
  );

  setTab("signin");

}

    if (!isSignIn) {
      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }

  } catch {

    toast.error(
      isSignIn
        ? "Unable to sign in."
        : "Unable to create account."
    );

  } finally {

    setSubmitting(false);

  }

};

  const handleFullNameChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const value = e.target.value;

  setForm(prev => ({
    ...prev,
    fullName: value,
  }));

  if (!value.trim()) {

    setErrors(prev => ({
      ...prev,
      fullName: "Full name is required.",
    }));

    return;
  }

  if (!nameRegex.test(value.trim())) {

    setErrors(prev => ({
      ...prev,
      fullName:
        "Only letters, spaces, hyphens and apostrophes are allowed.",
    }));

    return;
  }

  setErrors(prev => ({
    ...prev,
    fullName: "",
  }));
};

const handleEmailChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const value = e.target.value;

  setForm(prev => ({
    ...prev,
    email: value,
  }));

  if (!value.trim()) {

    setErrors(prev => ({
      ...prev,
      email: "Email is required.",
    }));

    return;
  }

  if (!emailRegex.test(value.trim())) {

    setErrors(prev => ({
      ...prev,
      email: "Enter a valid email address.",
    }));

    return;
  }

  setErrors(prev => ({
    ...prev,
    email: "",
  }));
};

const handlePasswordChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const value = e.target.value;

  setForm(prev => ({
    ...prev,
    password: value,
  }));

  if (!value.trim()) {

    setErrors(prev => ({
      ...prev,
      password: "Password is required.",
    }));

    return;
  }

  if (!passwordRegex.test(value)) {

    setErrors(prev => ({
      ...prev,
      password:
        "Password doesn't meet all requirements.",
    }));

    return;
  }

  setErrors(prev => ({
    ...prev,
    password: "",
  }));
};

const handleConfirmPasswordChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const value = e.target.value;

  setForm(prev => ({
    ...prev,
    confirmPassword: value,
  }));

  if (!value.trim()) {

    setErrors(prev => ({
      ...prev,
      confirmPassword: "Please confirm your password.",
    }));

    return;
  }

  if (value !== form.password) {

    setErrors(prev => ({
      ...prev,
      confirmPassword: "Passwords do not match.",
    }));

    return;
  }

  setErrors(prev => ({
    ...prev,
    confirmPassword: "",
  }));
};

useEffect(() => {
  if (isSignIn) return;

  if (!form.confirmPassword) return;

  if (!form.confirmPassword) return;

  if (form.confirmPassword !== form.password) {

    setErrors(prev => ({
      ...prev,
      confirmPassword: "Passwords do not match.",
    }));

  } else {

    setErrors(prev => ({
      ...prev,
      confirmPassword: "",
    }));

  }

}, [form.password, form.confirmPassword, isSignIn]);

const isSignUpValid =
  form.fullName.trim() &&
  form.email.trim() &&
  form.password &&
  form.confirmPassword &&
  !errors.fullName &&
  !errors.email &&
  !errors.password &&
  !errors.confirmPassword;

const isSignInValid =
  form.email.trim() &&
  form.password &&
  !errors.email &&
  !errors.password;

  return (

        <div className="
group
relative
w-full
max-w-[555px]
overflow-hidden
rounded-[18px]

border
border-white/[0.035]

bg-black/70

backdrop-blur-[52px]

p-4
sm:p-7

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
                <FieldInput name="fullName" type="text" placeholder="Jane Doe" icon={<Mail className="h-[18px] w-[18px]" />} 
                value={form.fullName}
                error={!!errors.fullName}
                onChange={handleFullNameChange}
/>

{errors.fullName && (

<p className="mt-2 text-xs text-red-400">

    {errors.fullName}

</p>

)}
              </Field>
            )}

            <Field label="Email Address">
              <FieldInput
                name="email"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="h-[18px] w-[18px]" />}
                 value={form.email}
    onChange={handleEmailChange}
    error={!!errors.email}
              />

              {errors.email && (
    <p className="mt-2 text-xs text-red-400">
      {errors.email}
    </p>
  )}
            </Field>

            <Field label="Password">
              <div
  className={`
    group
    relative
    flex
    items-center
    rounded-lg
    border
    bg-[#0d1115]/70
    transition-colors

    ${
      errors.password
        ? "border-red-500"
        : "border-white/10 hover:border-white/25 focus-within:border-[#22c55e]"
    }
  `}
>
                <span className="pointer-events-none absolute left-3.5 text-white/40">
                  <Lock className="h-[18px] w-[18px]" />
                </span>
                <input
  name="password"
  type={showPassword ? "text" : "password"}
  placeholder="Create a password"
  value={form.password}
  onChange={handlePasswordChange}
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
              {errors.password && (
  <p className="mt-2 text-xs text-red-400">
    {errors.password}
  </p>
)}

{!isSignIn && (

<div className="mt-3 space-y-1 text-xs">

  <p className={passwordChecks.length ? "text-green-400" : "text-white/40"}>
    ✓ At least 8 characters
  </p>

  <p className={passwordChecks.uppercase ? "text-green-400" : "text-white/40"}>
    ✓ One uppercase letter
  </p>

  <p className={passwordChecks.lowercase ? "text-green-400" : "text-white/40"}>
    ✓ One lowercase letter
  </p>

  <p className={passwordChecks.number ? "text-green-400" : "text-white/40"}>
    ✓ One number
  </p>

  <p className={passwordChecks.special ? "text-green-400" : "text-white/40"}>
    ✓ One special character
  </p>

</div>
)}

            </Field>

            {!isSignIn && (
              <Field label="Confirm Password">

  <div className="group relative flex items-center rounded-lg border border-white/10 bg-[#0d1115]/70 transition-colors focus-within:border-[#22c55e] focus-within:shadow-[0_0_0_3px_rgba(34,197,94,0.15)] hover:border-white/25">

    <span className="pointer-events-none absolute left-3.5 text-white/40">
      <Lock className="h-[18px] w-[18px]" />
    </span>

    <input
      name="confirmPassword"
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm your password"
      value={form.confirmPassword}
      onChange={handleConfirmPasswordChange}
      className="w-full bg-[#070809]/70 py-3 pl-11 pr-11 text-sm text-white outline-none placeholder:text-white/35"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword((s) => !s)
      }
      aria-label={
        showConfirmPassword
          ? "Hide password"
          : "Show password"
      }
      className="absolute right-3.5 text-white/40 transition-colors hover:text-white/80"
    >
      {showConfirmPassword ? (
        <EyeOff className="h-[18px] w-[18px]" />
      ) : (
        <Eye className="h-[18px] w-[18px]" />
      )}
    </button>

  </div>

  {errors.confirmPassword && (
    <p className="mt-2 text-sm text-red-400">
      {errors.confirmPassword}
    </p>
  )}

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
              disabled={
        submitting ||
        (isSignIn
            ? !isSignInValid
            : !isSignUpValid)
    }
              className="mt-1 w-full rounded-xl bg-[#22c55e] py-3 text-sm font-semibold text-[#06210f] transition-all duration-200 hover:bg-[#2ee06f] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"
            >
              {submitting
        ? (isSignIn
            ? "Signing In..."
            : "Creating Account...")
        : (isSignIn
            ? "Sign In"
            : "Create Account")}
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
  )
}