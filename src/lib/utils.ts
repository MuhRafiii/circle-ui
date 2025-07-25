import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { twMerge } from "tailwind-merge";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCardDate(isoDateString: string): string {
  const now = dayjs();
  const date = dayjs(isoDateString);

  const diffInSeconds = now.diff(date, "second");
  const diffInMinutes = now.diff(date, "minute");
  const diffInHours = now.diff(date, "hour");
  const diffInDays = now.diff(date, "day");
  const diffInWeeks = now.diff(date, "week");
  const diffInMonths = now.diff(date, "month");

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  if (diffInDays < 7) {
    return `${diffInDays}d`;
  }

  if (diffInWeeks < 4) {
    return `${diffInWeeks}w`;
  }

  if (diffInMonths >= 1) {
    if (now.year() !== date.year()) {
      return date.format("MMM D, YYYY");
    }

    return date.format("MMM D");
  }

  return date.format("MMM D YYYY");
}
