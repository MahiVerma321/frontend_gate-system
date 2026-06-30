interface FieldProps {
  label: string;
  children: React.ReactNode;
}

export default function Field({ label, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white/80">{label}</label>
      {children}
    </div>
  )
}