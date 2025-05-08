import React from 'react';
import Image from 'next/image';
import { getTechLogos } from '@/lib/utils';

type TechIconsProps = {
  techstack: string[];
};

const TechIcons = async ({ techstack }: TechIconsProps) => {
  const techIcons = await getTechLogos(techstack);

  return (
    <div className="flex items-center">
      {techIcons.slice(0, 3).map((techIcon, index) => (
        <div
          key={techIcon.tech}
          className={`relative group rounded-full h-10 w-10 flex items-center justify-center bg-dark-400 border-[0.8px] border-dark-300 ${index !== 0 && '-ml-1.5'}`}
        >
          <span className="tech-tooltip">{techIcon.tech}</span>
          <Image src={techIcon.url} alt={techIcon.tech} width={22} height={22} />
        </div>
      ))}
    </div>
  );
};

export default TechIcons;
