import { QuizData } from './quizTypes'

const cssQuizData: QuizData = {
  type: 'css',
  questions: [
    {
      question: 'What does CSS stand for?',
      options: ['Colorful Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets'],
      answer: 'C',
    },
    {
      question: 'Which property is used to change the background color?',
      options: ['color', 'bgcolor', 'background-color', 'background'],
      answer: 'C',
    },
    {
      question: 'How do you select an element with the id "header" in CSS?',
      options: ['#header', '.header', 'header', 'id=header'],
      answer: 'A',
    },
    {
      question: 'What is the default value of the `position` property in CSS?',
      options: ['absolute', 'relative', 'static', 'fixed'],
      answer: 'C',
    },
    {
      question: 'Which CSS property controls the text size?',
      options: ['font-size', 'text-size', 'font-style', 'text-style'],
      answer: 'A',
    },
    {
      question: 'How do you apply a style to all `<p>` elements in CSS?',
      options: ['.p { }', '#p { }', 'p: { }', 'p { }'],
      answer: 'D',
    },
    {
      question: 'What is the correct CSS syntax to change the color of a text?',
      options: ['text-color: blue;', 'color: blue;', 'font-color: blue;', 'background-color: blue;'],
      answer: 'B',
    },
    {
      question: 'Which property is used to set the space between lines of text?',
      options: ['text-spacing', 'letter-spacing', 'line-height', 'word-spacing'],
      answer: 'C',
    },
    {
      question: 'What does the `float` property do in CSS?',
      options: ['Positions an element to the left or right', 'Changes the element size', 'Sets the visibility of an element', 'Adjusts element margins'],
      answer: 'A',
    },
    {
      question: 'How do you select multiple classes in CSS?',
      options: ['.class1 .class2', '#class1 .class2', '.class1.class2', '.class1, .class2'],
      answer: 'D',
    },
  ],
};

export default cssQuizData
