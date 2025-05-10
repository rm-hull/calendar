export function pad(num: number | null, len: number): string {
  return String(num).padStart(len, "0");
}
