
export enum ScaffoldingLevel {
  CONFIRMATIVE = 'CONFIRMATIVE',
  GUIDED = 'GUIDED',
  STEP_BY_STEP = 'STEP_BY_STEP',
  COGNITIVE = 'COGNITIVE'
}

export type ProblemType = 'multiple-choice' | 'written';

export interface Choice {
  id: string;
  label: string;
  isCorrect: boolean;
  details: string;
}

export interface Problem {
  id: string;
  title: string;
  context: string;
  question: string;
  type: ProblemType;
  image?: string;
  choices?: Choice[];
  dataPoints: Record<string, any>;
}

export interface Feedback {
  level: ScaffoldingLevel;
  message: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface UserProgress {
  userId: string;
  completedStations: string[];
  attempts: Record<string, number>;
  history: {
    problemId: string;
    choiceId?: string;
    reasoning: string;
    feedbackLevel: ScaffoldingLevel;
    timestamp: number;
  }[];
}

export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher';
}
