import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// for merging tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// for finding the full country name from country code
export const countryNames = (code: string) => {
  const func = new Intl.DisplayNames(["en-US"], { type: "region" });

  return func.of(code);
};

// for finding the country emoji from country code
export const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  const emoji = String.fromCodePoint(...codePoints);
  return emoji.substring(0, emoji.length - 2);
};

// for finding the date difference in days
export const dateDiffInDays = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const timeDiff = Math.abs(date1.getTime() - date2.getTime());
  return Math.floor(timeDiff / oneDay);
};
