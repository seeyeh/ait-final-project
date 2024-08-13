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
