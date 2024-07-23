import { QuizData } from './quizTypes'

const htmlQuizData: QuizData = {
  type: 'html',
  questions: [
    {
      question: 'What does HTML stand for?',
      options: ['Heavily Technical Machine Language', 'Honest Text Modeling Logic', 'Hyper Text Markup Language', 'Handy Tabular Machine Lingo'],
      answer: 'C',
    },
    {
      question: 'Which HTML element is used to define the title of a document?',
      options: ['<head>', '<title>', '<meta>', '<body>'],
      answer: 'B',
    },
    {
      question: 'What is the correct HTML element for inserting a line break?',
      options: ['<break>', '<lb>', '<br>', '<line>'],
      answer: 'C',
    },
    {
      question: 'Which HTML tag is used to display a picture on a webpage?',
      options: ['<img>', '<picture>', '<photo>', '<image>'],
      answer: 'A',
    },
    {
      question: 'Which attribute is used to define the source of an image in HTML?',
      options: ['href', 'src', 'alt', 'link'],
      answer: 'B',
    },
    {
      question: 'What is the correct HTML element for playing video files?',
      options: ['<movie>', '<media>', '<play>', '<video>'],
      answer: 'D',
    },
    {
      question: 'What does the `<a>` HTML element represent?',
      options: ['Link', 'Image', 'Form', 'Button'],
      answer: 'A',
    },
    {
      question: 'Which HTML tag is used to create an unordered list?',
      options: ['<ol>', '<ul>', '<list>', '<item>'],
      answer: 'B',
    },
    {
      question: 'How can you make a numbered list in HTML?',
      options: ['<ul>', '<ol>', '<dl>', '<list>'],
      answer: 'B',
    },
    {
      question: 'Which HTML element is used to define important text?',
      options: ['<strong>', '<b>', '<important>', '<i>'],
      answer: 'A',
    },
  ],
};

export default htmlQuizData
