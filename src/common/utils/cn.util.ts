import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges multiple class values into a single string, handling conditional and array-based class names.
 * Utilizes `clsx` to combine the inputs and `twMerge` to intelligently merge Tailwind CSS classes.
 *
 * @param inputs - A list of class values (strings, arrays, or objects) to be merged.
 * @returns A single string containing the merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
