import { useEffect, useState } from 'react'
import { QuizData } from '../data/quizTypes'

const Quiz: React.FC<QuizData> = ({ questions }) => {
  const [questionNumber, setQuestionNumber] = useState(1)
  const [questionText, setQuestionText] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [allLoaded, setAllLoaded] = useState(false)

  useEffect(() => {
    const loadQuestion = () => {
      let index = 0
      const question = questions[questionNumber - 1].question
      const questionInterval = setInterval(() => {
        setQuestionText(question.slice(0, index + 1))
        index++;
        if (index === question.length) {
          clearInterval(questionInterval)
          loadOptions()
        }
      }, 50)
      return () => clearInterval(questionInterval)
    }

    const loadOptions = () => {
      let index = 0
      const options = questions[questionNumber - 1].options
      const optionsInterval = setInterval(() => {
        const newOptions = options.slice(0, index + 1)
        setOptions(newOptions)
        index++;
        if (index === 4) {
          clearInterval(optionsInterval)
          setAllLoaded(true)
        }
      }, 1000)
      return () => clearInterval(optionsInterval)
    }

    loadQuestion()
  }, [questions, questionNumber])

  return (
    <section>
      <h2 className="flex justify-center items-center font-bold text-3xl sm:text-4xl md:text-5xl h-24 md:h-16">{questionText}</h2>
      <section className="flex justify-between items-center h-24 mb-8">
        <div className="w-powerups">Powerups</div>
        <div className="flex justify-center items-center w-24 h-full border-4 text-blue-700 border-blue-700 rounded-full text-4xl">30</div>
      </section>
      <section className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 h-options-small md:h-options text-center hover:cursor-pointer">
        <div className="flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4 bg-red-300 border-red-500 hover:bg-red-400">
          {options[0]}
        </div>
        <div className="flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4 bg-blue-300 border-blue-500 hover:bg-blue-400">
          {options[1]}
        </div>
        <div className="flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4 bg-yellow-300 border-yellow-500 hover:bg-yellow-400">
          {options[2]}
        </div>
        <div className="flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4 bg-green-300 border-green-500 hover:bg-green-400">
          {options[3]}
        </div>
      </section>
    </section>
  )
}

export default Quiz
