import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

enum CallStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  FINISHED = 'FINISHED',
  CONNECTING = 'CONNECTING',
}

type AgentProps = {
  userName: string;
  userId: string;
  type: string;
};

const messages = [
  {
    id: 1,
    message: 'Hi, I am your interviewer',
    isMe: false,
  },
  {
    id: 2,
    message: 'Cupiditate molestiae obcaecati quaerat qui ratione sequi.',
    isMe: true,
  },
  {
    id: 3,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur autem deserunt eius.',
    isMe: false,
  },
];

const Agent = ({ userName, userId, type }: AgentProps) => {
  const callStatus = CallStatus.CONNECTING;
  const isSpeaking = true;

  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <div className="call-view mb-6">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>Ai Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user avatar"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      {messages.length && (
        <div className="transcript-border mb-9">
          <div className="transcript">
            <p
              key={lastMessage.message}
              className={cn(
                'transition-opacity duration-500 opacity-0',
                'animate-fadeIn opacity-100',
              )}
            >
              {lastMessage.message}
            </p>
          </div>
        </div>
      )}
      <div className="flex-center gap-4">
        {callStatus !== CallStatus.ACTIVE ? (
          <Button variant="call" size="md" className="w-53 font-semibold text-lg relative">
            {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
              ? 'Start call'
              : '. . .'}
            <span
              className={cn(
                'absolute animate-ping rounded-full opacity-75',
                callStatus !== CallStatus.CONNECTING && 'hidden',
              )}
            />
          </Button>
        ) : (
          <Button variant="disconnect" size="md" className="w-53 font-semibold text-lg">
            Leave call
          </Button>
        )}
      </div>
    </>
  );
};

export default Agent;
