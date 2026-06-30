export function formatRecognitionTime(timestamp: string) {
  const date = new Date(timestamp);

  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  if (date >= today) {
    return `Today • ${time}`;
  }

  if (date >= yesterday && date < today) {
    return `Yesterday • ${time}`;
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}