export function getSeconds(millSec: number) {
  return (millSec % 60000) / 1000;
}
