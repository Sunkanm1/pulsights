// NGX trading hours: 10:00-14:30 WAT (UTC+1, no DST), Monday-Friday.
// The Vercel cron schedule (see vercel.ts) fires on a superset window; this
// guard is the precise cutoff so a stray/late invocation is a no-op instead
// of writing an off-hours "quote" that looks like it happened during trading.

export function isNgxTradingHours(date: Date = new Date()): boolean {
  const watMinutes = (date.getUTCHours() * 60 + date.getUTCMinutes() + 60) % (24 * 60);
  const watDay = new Date(date.getTime() + 60 * 60 * 1000).getUTCDay(); // 0=Sun..6=Sat, shifted to WAT
  const isWeekday = watDay >= 1 && watDay <= 5;
  const afterOpen = watMinutes >= 10 * 60;
  const beforeClose = watMinutes <= 14 * 60 + 30;
  return isWeekday && afterOpen && beforeClose;
}
