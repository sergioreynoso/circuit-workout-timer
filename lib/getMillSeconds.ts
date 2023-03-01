export function getMillSeconds(min: number, sec: number) {
  const minToMill = min > 0 ? 60000 * min : 0;
  const secToMill = sec > 0 ? sec * 1000 : 0;
  return minToMill + secToMill;
}
