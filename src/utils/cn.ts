import { type ClassValue, clsx } from 'clsx'

/**
 * Utility function to merge class names
 * Uses clsx for conditional classes and string merging
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}