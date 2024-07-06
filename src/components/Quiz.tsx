import { QuizData } from '../data/quizTypes'

const Quiz: React.FC<QuizData> = ({ title, questions }) => {
  return (
    <div>
      <h1>{title}</h1>
      {questions.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          <ul>
            {q.options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
