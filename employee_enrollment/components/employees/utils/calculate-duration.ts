export function calculateDuration(
  firstIn: string,
  lastOut: string
) {
  if (lastOut === "--") return "--";

  const [inHour, inMin] = firstIn.split(":").map(Number);
  const [outHour, outMin] = lastOut.split(":").map(Number);

  const inMinutes = inHour * 60 + inMin;
  const outMinutes = outHour * 60 + outMin;

  const total = outMinutes - inMinutes;

  if (total <= 0) return "--";

  const hours = Math.floor(total / 60);
  const mins = total % 60;

  return `${hours}h ${mins}m`;
}