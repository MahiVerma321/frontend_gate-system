import { Employee } from "@/types/employee";

interface Props {
  status: Employee["status"];
}

export function StatusBadge({ status }: Props) {
  const styles = {
    inside:
      "border-green-500/30 bg-green-500/10 text-green-400",

    outside:
      "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",

    inactive:
      "border-red-500/30 bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        capitalize
        ${styles[status]}
      `}
    >
      <span className="mr-2 h-2 w-2 rounded-full bg-current" />
      {status}
    </span>
  );
}