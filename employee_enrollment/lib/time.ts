export function getRelativeTime(lastSeen: string) {

  if (!lastSeen.includes("Today"))
    return lastSeen;

  const time = lastSeen.replace("Today • ", "");

  const now = new Date();

  const date = new Date();

  const [clock, period] = time.split(" ");

  let [hour, minute] = clock.split(":").map(Number);

  if (period === "PM" && hour !== 12)
    hour += 12;

  if (period === "AM" && hour === 12)
    hour = 0;

  date.setHours(hour, minute);

  if (date > now) {
  date.setDate(date.getDate() - 1);
}

  const diff =
    Math.floor((now.getTime() - date.getTime()) / 60000);

  if (diff <= 0)
    return "Just now";

  if (diff < 60)
    return `${diff} min ago`;

  return `${Math.floor(diff / 60)} hr ago`;
}