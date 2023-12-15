export function isEmpty(value: string | undefined | null) {
  return value === null || value === undefined || value.length === 0;
}
