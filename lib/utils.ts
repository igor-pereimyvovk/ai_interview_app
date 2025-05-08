import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { interviewCovers, mappings, techIconBaseURL } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomInterviewCover = () =>
  `/covers${interviewCovers[Math.floor(Math.random() * interviewCovers.length)]}`;

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, '').replace(/\s+/g, '');
  return mappings[key as keyof typeof mappings];
};

const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

export const getTechLogos = async (techArray: string[]) => {
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : '/tech.svg',
    })),
  );

  return results;
};
