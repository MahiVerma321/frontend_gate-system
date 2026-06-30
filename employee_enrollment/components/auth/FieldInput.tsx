import { ChangeEventHandler, ReactNode } from "react";

interface FieldInputProps {
  name: string;
  type: string;
  placeholder: string;
  icon: ReactNode;

  value?: string;

  onChange?: ChangeEventHandler<HTMLInputElement>;

  error?: boolean;

  className?: string;
}

export default function FieldInput({
  name,
  type,
  placeholder,
  icon,
  value,
  onChange,
  error = false,
  className = "",
}: FieldInputProps) {
  return (
    <div
  className={`
    relative
    flex
    items-center
    rounded-lg
    border
    bg-[#070809]/70
    transition-colors

    ${
      error
        ? "border-red-500 focus-within:border-red-500 focus-within:shadow-[0_0_0_3px_rgba(239,68,68,.18)]"
        : "border-white/10 hover:border-white/25 focus-within:border-[#22c55e] focus-within:shadow-[0_0_0_3px_rgba(34,197,94,.15)]"
    }

    ${className}
  `}
>
      <span className="pointer-events-none absolute left-3.5 text-white/40">
        {icon}
      </span>

      <input
  name={name}
  type={type}
  placeholder={placeholder}
  value={value}
  onChange={onChange}
  autoComplete="off"
  className="
    w-full
    bg-transparent
    py-3
    pl-11
    pr-4
    text-sm
    text-white
    outline-none
    placeholder:text-white/35
  "
/>
    </div>
  );
}