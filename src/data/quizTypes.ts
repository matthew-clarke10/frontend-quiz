export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface QuizData {
  type: string;
  questions: Question[];
}
