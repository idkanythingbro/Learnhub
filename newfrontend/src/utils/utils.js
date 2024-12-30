export function timeAgo(dateString, locale = "en") {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const date = new Date(dateString);
  const now = new Date();
  const secondsDifference = (date - now) / 1000;

  const intervals = [
    { limit: 60, divisor: 1, unit: "second" },
    { limit: 3600, divisor: 60, unit: "minute" },
    { limit: 86400, divisor: 3600, unit: "hour" },
    { limit: 2592000, divisor: 86400, unit: "day" },
    { limit: 31536000, divisor: 2592000, unit: "month" },
    { limit: Infinity, divisor: 31536000, unit: "year" },
  ];

  const absSeconds = Math.abs(secondsDifference);

  for (let interval of intervals) {
    if (absSeconds < interval.limit) {
      const value = Math.round(secondsDifference / interval.divisor);
      return rtf.format(value, interval.unit);
    }
  }

  return "just now";
}
