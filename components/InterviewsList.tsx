import React from 'react';
import InterviewCard from '@/components/InterviewCard';

type InterviewsListProps = {
  interviewsTitle: string;
  interviews: Interview[];
};

const InterviewsList = ({ interviewsTitle, interviews }: InterviewsListProps) => {
  return (
    <div className="mb-12.5">
      <h2 className="text-[1.75rem] mb-7.5">{interviewsTitle}</h2>
      <div className="interviews-section">
        {interviews.map((interview) => (
          <InterviewCard key={interview.id} {...interview} />
        ))}
      </div>
    </div>
  );
};

export default InterviewsList;
