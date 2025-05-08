import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import InterviewsList from '@/components/InterviewsList';

import { dummyInterviews } from '@/constants';

const Page = () => {
  return (
    <>
      <section className="card-cta max-lg:py-5">
        <div className="max-w-lg max-sm:max-w-full flex-1">
          <h2 className="text-brand text-white mb-3">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className="text-lg text-light-100 mb-6">
            Practice real interview questions & get instant feedback.
          </p>
          <Button asChild size="sm" className="font-semibold max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <div className="min-w-72 max-md:hidden mt-[2.375rem] max-lg:mt-0 flex-1 flex justify-end">
          <Image src="/robot.png" alt="robot" width={441.5} height={293} />
        </div>
      </section>
      <section>
        <InterviewsList interviewsTitle="Your Past Interviews" interviews={dummyInterviews} />
      </section>
    </>
  );
};

export default Page;
