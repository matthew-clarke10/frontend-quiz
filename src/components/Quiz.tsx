import { FaHeartCirclePlus } from 'react-icons/fa6'
import { FaRegSnowflake } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { QuizData } from '../data/quizTypes'

const Quiz: React.FC<QuizData> = ({ questions }) => {
  const [questionNumber, setQuestionNumber] = useState(1)
  const [questionText, setQuestionText] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [allLoaded, setAllLoaded] = useState(false)
  const [timer, setTimer] = useState(30)
  const [selectedOption, setSelectedOption] = useState(false)
  const [optionChosen, setOptionChosen] = useState('')

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
        index++
        if (index === 4) {
          clearInterval(optionsInterval)
          setAllLoaded(true)
        }
      }, 1000)
      return () => clearInterval(optionsInterval)
    }

    const startTimer = () => {
      let time = 30
      const timerInterval = setInterval(() => {
        setTimer(--time)
        if (selectedOption) {
          clearInterval(timerInterval)
        }

        if (time === 0) {
          clearInterval(timerInterval)
        }
      }, 1000)
      return () => clearInterval(timerInterval)
    }

    if (questionText === '') {
      loadQuestion()
    }

    if (allLoaded) {
      startTimer()
    }
  }, [questions, questionText, questionNumber, allLoaded, selectedOption])

  const handleOptionClick = (optionClicked: string) => {
    if (allLoaded) {
      setOptionChosen(optionClicked)
      setSelectedOption(true)
      if (optionClicked === questions[questionNumber - 1].answer) {
        // TO-DO
        const timerInterval = setInterval(() => {
          setQuestionNumber(questionNumber + 1)
          setQuestionText('')
          setOptions([])
          setAllLoaded(false)
          setTimer(30)
          setSelectedOption(false)
          setOptionChosen('')
          clearInterval(timerInterval)
        }, 3000)

      } else {
        // TO-DO
      }
    }
  }

  return (
    <section>
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-center h-12 md:h-16">Question {questionNumber}</h2>
      <h3 className="flex justify-center text-center font-bold text-3xl sm:text-4xl md:text-5xl h-24 md:h-16">{questionText}</h3>
      <section className="flex flex-wrap justify-between items-center h-24 mb-8">
        <div className="w-auto sm:w-powerups flex flex-wrap items-center gap-2">
          <div className=""><FaHeartCirclePlus title="Second chance" color="red" className="w-16 sm:w-24 md:w-36 h-12 md:h-16 border-4 border-red-500 py-2 hover:cursor-pointer hover:bg-red-200" /></div>
          <div title="Choose between two options" className="flex justify-center items-center sm:w-24 md:w-36 h-12 md:h-16 border-4 border-green-400 text-green-400 text-base md:text-2xl p-2 hover:cursor-pointer hover:bg-green-200">50/50</div>
          <div className=""><FaRegSnowflake title="Freeze time for 30 seconds" color="#BAE6FD" className="w-16 sm:w-24 md:w-36 h-12 md:h-16 border-4 border-sky-300 py-2 hover:cursor-pointer hover:bg-sky-100" /></div>
        </div>
        <div className="flex justify-center items-center w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 border-4 text-yellow-500 border-yellow-500 rounded-full text-2xl sm:text-3xl md:text-4xl">{timer}</div>
      </section>
      <section className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 h-options-small md:h-options text-center hover:cursor-pointer">
        <button onClick={() => handleOptionClick('A')} className={`flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4
          ${selectedOption && optionChosen === 'A' && questions[questionNumber - 1].answer === 'A' ? 'bg-green-500 border-green-600'
            : selectedOption && optionChosen === 'A' && questions[questionNumber - 1].answer !== 'A' ? 'bg-red-500 border-red-600'
              : selectedOption && optionChosen !== 'A' && questions[questionNumber - 1].answer == 'A' ? 'bg-green-500 border-green-600'
                : selectedOption && optionChosen !== 'A' && questions[questionNumber - 1].answer !== 'A' ? 'opacity-50 bg-blue-300 border-blue-500 hover:bg-blue-400'
                  : 'bg-red-300 border-red-500 hover:bg-red-400'}`}>
          {options[0]}
        </button>
        <button onClick={() => handleOptionClick('B')} className={`flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4
          ${selectedOption && optionChosen === 'B' && questions[questionNumber - 1].answer === 'B' ? 'bg-green-500 border-green-600'
            : selectedOption && optionChosen === 'B' && questions[questionNumber - 1].answer !== 'B' ? 'bg-red-500 border-red-600'
              : selectedOption && optionChosen !== 'B' && questions[questionNumber - 1].answer == 'B' ? 'bg-green-500 border-green-600'
                : selectedOption && optionChosen !== 'B' && questions[questionNumber - 1].answer !== 'B' ? 'opacity-50 bg-blue-300 border-blue-500 hover:bg-blue-400'
                  : 'bg-blue-300 border-blue-500 hover:bg-blue-400'}`}>
          {options[1]}
        </button>
        <button onClick={() => handleOptionClick('C')} className={`flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4
          ${selectedOption && optionChosen === 'C' && questions[questionNumber - 1].answer === 'C' ? 'bg-green-500 border-green-600'
            : selectedOption && optionChosen === 'C' && questions[questionNumber - 1].answer !== 'C' ? 'bg-red-500 border-red-600'
              : selectedOption && optionChosen !== 'C' && questions[questionNumber - 1].answer == 'C' ? 'bg-green-500 border-green-600'
                : selectedOption && optionChosen !== 'C' && questions[questionNumber - 1].answer !== 'C' ? 'opacity-50 bg-blue-300 border-blue-500 hover:bg-blue-400'
                  : 'bg-yellow-300 border-yellow-500 hover:bg-yellow-400'}`}>
          {options[2]}
        </button>
        <button onClick={() => handleOptionClick('D')} className={`flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4
          ${selectedOption && optionChosen === 'D' && questions[questionNumber - 1].answer === 'D' ? 'bg-green-500 border-green-600'
            : selectedOption && optionChosen === 'D' && questions[questionNumber - 1].answer !== 'D' ? 'bg-red-500 border-red-600'
              : selectedOption && optionChosen !== 'D' && questions[questionNumber - 1].answer == 'D' ? 'bg-green-500 border-green-600'
                : selectedOption && optionChosen !== 'D' && questions[questionNumber - 1].answer !== 'D' ? 'opacity-50 bg-blue-300 border-blue-500 hover:bg-blue-400'
                  : 'bg-green-300 border-green-500 hover:bg-green-400'}`}>
          {options[3]}
        </button>
      </section>
    </section>
  )
}

export default Quiz
