"use client";

type Props = {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;

  children: React.ReactNode;
};

export function SelectField({
  label,
  value,
  onChange,
  children,
}: Props) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-muted-foreground">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-xl
          border border-white/10
          bg-white/[0.03]
          px-4
          py-3
          outline-none
          transition
          focus:border-cyan-500
        "
      >
        {children}
      </select>

    </div>
  );
}