import React from 'react';
import Agent from '@/components/Agent';

const Page = () => {
  return (
    <>
      <div className="mt-15">
        <h2 className="text-3xl text-white mb-11">Interview Generation</h2>
        <Agent userName="temp" userId="temp" type="generate" />
      </div>
    </>
  );
};

export default Page;
