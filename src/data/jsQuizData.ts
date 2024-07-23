import { QuizData } from './quizTypes'

const jsQuizData: QuizData = {
  type: 'javascript',
  questions: [
    {
      question: 'What does JS stand for?',
      options: ['JavaScript', 'JavaStyle', 'JavaShell', 'JavaScriptStyle'],
      answer: 'A',
    },
    {
      question: 'Which company developed JavaScript?',
      options: ['Microsoft', 'Google', 'Apple', 'Netscape'],
      answer: 'D',
    },
    {
      question: 'What is the correct syntax to output "Hello World" in JavaScript?',
      options: ['print("Hello World");', 'echo "Hello World";', 'console.log("Hello World");', 'document.write("Hello World");'],
      answer: 'C',
    },
    {
      question: 'Which symbol is used for multi-line comments in JavaScript?',
      options: ['//', '#', '<!--', '/*'],
      answer: 'D',
    },
    {
      question: 'How do you create a function in JavaScript?',
      options: ['function myFunction() {}', 'create function myFunction() {}', 'function:myFunction() {}', 'def myFunction() {}'],
      answer: 'A',
    },
    {
      question: 'What is the correct way to declare a constant in JavaScript?',
      options: ['var myVar', 'variable myVar', 'let myVar', 'const myVar'],
      answer: 'D',
    },
    {
      question: 'Which method is used to convert a string to a number in JavaScript?',
      options: ['convertToNumber()', 'parseInt()', 'toNumber()', 'parseFloat()'],
      answer: 'B',
    },
    {
      question: 'How can you detect the browser name in JavaScript?',
      options: ['navigator.appName', 'navigator.userAgent', 'browser.name', 'navigator.browserName'],
      answer: 'A',
    },
    {
      question: 'What is the correct syntax for an if statement in JavaScript?',
      options: ['if condition {}', 'if [condition] {}', 'if (condition) {}', 'if {condition}'],
      answer: 'C',
    },
    {
      question: 'How do you add a single line comment in JavaScript?',
      options: ['// This is a comment', '# This is a comment', '/* This is a comment */', '-- This is a comment'],
      answer: 'A',
    },
  ],
};

export default jsQuizData
