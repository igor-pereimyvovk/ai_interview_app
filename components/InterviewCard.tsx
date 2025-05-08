import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import TechIcons from '@/components/TechIcons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type InterviewCardProps = {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
};

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;

  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
  const badgeBackgroundColor = normalizedType === 'Mixed' ? 'bg-light-400' : 'bg-light-800';

  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format(
    'MMM DD, YYYY',
  );

  return (
    <div className="card-border h-[28rem] w-[22.5rem] shadow-card-cta">
      <div className="card-interview">
        <div>
          <div className={`badge-container ${badgeBackgroundColor}`}>
            <p className="badge-text">{normalizedType}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="interview cover"
            width={90}
            height={90}
            className="rounded-full mb-5"
          />
          <h3 className="text-2xl font-semibold mb-4">{`${role} Interview`}</h3>
          <div className="flex items-center gap-5 mb-5">
            <div className="flex items-center gap-2">
              <Image src="/calendar.svg" alt="calendar icon" width={22} height={22} />
              <p className="text-light-100">{formattedDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/star.svg" alt="star icon" width={22} height={22} />
              <p className="text-light-100">{feedback?.totalScore || '---/100'}</p>
            </div>
          </div>
          <p className="line-clamp-3">
            {feedback?.finalAssessment ||
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cumque debitis esse fugiat id laborum, nobis nostrum optio placeat quas repudiandae soluta sunt tenetur? Amet dignissimos dolorum iure magni tempora.'}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <TechIcons techstack={techstack} />
          <Button asChild className="px-11 font-semibold">
            <Link href={`/interview/${interviewId}`}>
              {feedback ? 'View interview' : 'Take interview'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
