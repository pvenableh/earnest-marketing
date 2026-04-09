import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertIconName(name: string): string {
  if (!name) return "";
  if (name.includes(":")) return name;

  let stripped = name;
  if (stripped.startsWith("i-")) {
    stripped = stripped.slice(2);
  }

  const collections = [
    "heroicons-solid",
    "heroicons-outline",
    "heroicons",
    "lucide",
    "mdi",
    "material-symbols-light",
    "material-symbols",
  ];

  for (const collection of collections) {
    if (stripped.startsWith(`${collection}-`)) {
      return `${collection}:${stripped.slice(collection.length + 1)}`;
    }
  }

  return `lucide:${stripped}`;
}
