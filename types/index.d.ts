type FormType = 'sign-in' | 'sign-up';

type Interview = {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
};

type Feedback = {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
};

type SignUpParams = {
  uid: string;
  name: string;
  email: string;
};

type SignInParams = {
  email: string;
  idToken: string;
};

type User = {
  name: string;
  email: string;
  id: string;
};
