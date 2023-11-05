import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const countryNames = (code: string) => {
  const func = new Intl.DisplayNames(["en-US"], { type: "region" });

  return func.of(code);
};

export const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  const emoji = String.fromCodePoint(...codePoints);
  return emoji.substring(0, emoji.length - 2);
};
