export function formatDate(dateString: string = ''): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  if (diffInDays === 0) {
    return `Сегодня в ${hours}:${minutes}`;
  } else if (diffInDays === 1) {
    return `Вчера в ${hours}:${minutes}`;
  } else if (diffInDays > 1) {
    return `${diffInDays} дня назад в ${hours}:${minutes}`;
  } else {
    return date.toLocaleString();
  }
}