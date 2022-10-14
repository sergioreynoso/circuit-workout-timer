export default function abbreviateName(name: string) {
  return name
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("")
    .slice(0, 3);
}
