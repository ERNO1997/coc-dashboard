export function getLastTimeSeenInDays(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const now = new Date();
  return now.getDate() - date.getDate();
}
