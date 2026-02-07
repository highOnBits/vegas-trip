import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to handle image paths with base path for GitHub Pages
export function getImagePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  // If path already starts with basePath, return as is
  if (path.startsWith(basePath)) {
    return path
  }
  // Add basePath to the beginning of the path
  return `${basePath}${path}`
}
