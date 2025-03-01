import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {  // No type annotations in JS
  return twMerge(clsx(inputs));
}