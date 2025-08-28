export interface MCQOption {
  A: string;
  B: string;
  C: string;
  D: string;
  E?: string;
}

export interface MCQFeedback {
  correct: string;
  wrong: string;
}

export interface MCQ {
  id: string;
  stem: string;
  options: MCQOption;
  feedback: MCQFeedback;
  learning_gap?: string;
  correct_answer: keyof MCQOption;
}

export interface MCQCollection {
  [key: string]: MCQ;
}

export interface HighYieldImage {
  keywords: string[];
  description: string;
  search_query: string;
}

export interface RecommendedVideo {
  keywords: string[];
  description: string;
  search_query: string;
}

export interface RecursiveLearningGap {
  id: string;
  gap: string;
  level: number;
  confusion: string;
}

export interface MCQData {
  mcqs: MCQCollection;
  level_1_mcqs?: MCQCollection;
  level_2_mcqs?: MCQCollection;
  level_3_mcqs?: MCQCollection;
  level_4_mcqs?: MCQCollection;
  level_5_mcqs?: MCQCollection;
  level_6_mcqs?: MCQCollection;
  buzzwords: string[];
  final_summary: string;
  high_yield_images: HighYieldImage[];
  learning_gap_tags: string[];
  recommended_videos: RecommendedVideo[];
  recursive_learning_gaps: RecursiveLearningGap[];
  primary_seq?: number;
  id?: string;
}

export interface ChatMessage {
  id: string;
  type: 'tutor' | 'student';
  content: string;
  timestamp: Date;
  isCorrect?: boolean;
}

export interface ProgressState {
  seq: number;
  level: number;
  index: number;
}