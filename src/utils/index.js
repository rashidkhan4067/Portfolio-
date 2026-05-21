/**
 * utils/index.js — Pure utility functions
 */

/**
 * Clamps a number between min and max
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Format a date string for display
 */
export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/**
 * Truncate string to a max length with ellipsis
 */
export const truncate = (str, max = 100) =>
  str.length > max ? `${str.slice(0, max).trim()}…` : str;

/**
 * Deep merge two objects
 */
export const deepMerge = (target, source) => {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] instanceof Object &&
      !Array.isArray(source[key]) &&
      key in target
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

/**
 * Debounce a function call
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Join class names, filtering out falsy values
 */
export const cx = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Check if we're in a browser environment
 */
export const isBrowser = () => typeof window !== 'undefined';

/**
 * Generate a random ID (for keys when data has none)
 */
export const uid = () => Math.random().toString(36).slice(2, 11);
