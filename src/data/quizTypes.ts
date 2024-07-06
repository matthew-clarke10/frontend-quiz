export interface Question {
  question: string;
  options: string[];
}

export interface QuizData {
  title: string;
  questions: Question[];
}
