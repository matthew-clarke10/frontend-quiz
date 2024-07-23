import { QuizData } from './quizTypes'

const allQuizData: QuizData = {
  type: 'all',
  questions: [
    {
      question: 'Which keyword is used to declare a constant in JavaScript?',
      options: ['var', 'let', 'const', 'new'],
      answer: 'C',
    },
    {
      question: 'Which HTML tag is used to define a table?',
      options: ['<tab>', '<tbl>', '<tr>', '<table>'],
      answer: 'D',
    },
    {
      question: 'Which CSS property is used to set the font of an element?',
      options: ['font-style', 'font-family', 'font-size', 'text-font'],
      answer: 'B',
    },
    {
      question: 'Which method is used to add an element to the end of an array in JavaScript?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      answer: 'A',
    },
    {
      question: 'Which attribute is used to specify the URL of a link?',
      options: ['src', 'link', 'href', 'url'],
      answer: 'C',
    },
    {
      question: 'How do you apply a border to an element in CSS?',
      options: ['border-width: 1px;', 'border-style: solid;', 'border-color: black;', 'border: 1px solid black;'],
      answer: 'D',
    },
    {
      question: 'What is the purpose of the `return` statement in JavaScript?',
      options: ['Ends a function and returns a value', 'Declares a variable', 'Creates a loop', 'Defines a new function'],
      answer: 'A',
    },
    {
      question: 'What is the purpose of the `<meta>` tag in HTML?',
      options: ['Defines the main content of the page', 'Provides metadata about the HTML document', 'Inserts a line break', 'Sets the title of the document'],
      answer: 'B',
    },
    {
      question: 'What does the `z-index` property do in CSS?',
      options: ['Specifies the stack order of elements', 'Defines the size of the element', 'Sets the visibility of an element', 'Adjusts the padding of an element'],
      answer: 'A',
    },
    {
      question: 'How do you write a single line comment in JavaScript?',
      options: ['# This is a comment', '/* This is a comment */', '// This is a comment', '<!-- This is a comment -->'],
      answer: 'C',
    },
  ],
}

export default allQuizData