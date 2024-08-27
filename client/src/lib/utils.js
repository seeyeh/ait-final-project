import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-h6',
        'text-h5',
        'text-h4',
        'text-h3',
        'text-h2',
        'text-h1',
        'text-p',
        'text-small'
      ]
    }
  }
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function daysAgoString(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  const daysDifference = (today - date) / (1000 * 60 * 60 * 24);

  switch (daysDifference) {
    case 0:
      return 'Today';
    case 1:
      return 'Yesterday';
    default:
      return `${daysDifference} days ago`;
  }
}
