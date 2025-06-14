import { default as dayjs } from 'dayjs';

export const formatDate = (date: number) =>
  dayjs(date).format('MMMM D, YYYY h:mm A');

// expects "2025-02-21T15:30:45Z"
export const customFormatDate = (updatedAt: string) => {
  const date = new Date(updatedAt);
  return date
    .toLocaleString('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
    })
    .replace(',', '');
};

export function formatRelativeTime(createdAt: Date): string | null {
  if (!createdAt) return null;

  const date = new Date(createdAt);
  if (isNaN(date.getTime())) return 'Invalid date';

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const isPast = diff >= 0;
  const absDiff = Math.abs(diff);

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;

  if (absDiff < MINUTE) {
    return isPast ? 'just now' : 'in a few seconds';
  } else if (absDiff < HOUR) {
    const minutes = Math.floor(absDiff / MINUTE);
    return isPast ? `${minutes}m ago` : `in ${minutes}m`;
  } else if (absDiff < DAY) {
    const hours = Math.floor(absDiff / HOUR);
    return isPast ? `${hours}h ago` : `in ${hours}h`;
  } else if (absDiff < WEEK) {
    const days = Math.floor(absDiff / DAY);
    return isPast ? `${days}d ago` : `in ${days}d`;
  } else if (absDiff < 4 * WEEK) {
    const weeks = Math.floor(absDiff / WEEK);
    return isPast ? `${weeks}w ago` : `in ${weeks}w`;
  } else if (absDiff < YEAR) {
    const months = Math.floor(absDiff / MONTH);
    return isPast ? `${months}mo ago` : `in ${months}mo`;
  } else {
    const years = Math.floor(absDiff / YEAR);
    return isPast ? `${years}y ago` : `in ${years}y`;
  }
}
