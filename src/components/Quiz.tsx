import { FaHeartCirclePlus } from 'react-icons/fa6'
import { FaRegSnowflake } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { QuizData } from '../data/quizTypes'

let selectedOption = false
let freezeState = "unused"

const Quiz: React.FC<QuizData> = ({ questions }) => {
  const [questionNumber, setQuestionNumber] = useState(1)
  const [questionText, setQuestionText] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [allLoaded, setAllLoaded] = useState(false)
  const [timer, setTimer] = useState(30)
  const [optionChosen, setOptionChosen] = useState('')
  const [secondChanceState, setSecondChanceState] = useState('unused')
  const [fiftyFiftyState, setFiftyFiftyState] = useState('unused')
  const [freezeUsed, setFreezeUsed] = useState(false)

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
        if (freezeState === "active") {
          clearInterval(timerInterval)
          const freezeTimeout = setTimeout(() => {
            const secondTimerInterval = setInterval(() => {
              freezeState = "used"
              clearTimeout(freezeTimeout)
              if (selectedOption) {
                clearInterval(timerInterval)
                clearInterval(secondTimerInterval)
              } else {
                setTimer(--time)
              }

              if (time === 0) {
                clearInterval(timerInterval)
                clearInterval(secondTimerInterval)
                lostGame()
              }
            }, 1000)
          }, 30000)
        }

        if (selectedOption) {
          clearInterval(timerInterval)
        } else {
          if (freezeState !== "active") {
            setTimer(--time)
          } else {
            setFreezeUsed(true)
          }
        }

        if (time === 0) {
          clearInterval(timerInterval)
          lostGame()
        }
      }, 1000)
      return () => clearInterval(timerInterval)
    }

    if (questionText === '') {
      loadQuestion();
    }

    if (allLoaded) {
      startTimer();
    }
  }, [questions, questionText, questionNumber, allLoaded]);

  const handleOptionClick = (optionClicked: string) => {

    if (!selectedOption) {
      if (allLoaded) {
        if (secondChanceState === "unused" || secondChanceState === "used") {
          if (fiftyFiftyState === "unused" || fiftyFiftyState === "used") {
            setOptionChosen(optionClicked)
            selectedOption = true
            const answerInterval = setInterval(() => {
              if (optionClicked === questions[questionNumber - 1].answer) {
                if (questionNumber === 10) {
                  wonGame()
                } else {
                  setAllLoaded(false)
                  setQuestionNumber(questionNumber + 1)
                  setOptions([])
                  setTimer(30)
                  selectedOption = false
                  setOptionChosen('')
                  setQuestionText('')
                  clearInterval(answerInterval)
                }
              } else {
                clearInterval(answerInterval)
                lostGame()
              }
            }, 3000)
          } else {
            handleFiftyFiftyInUse(optionClicked)
          }
        } else {
          if (fiftyFiftyState === "unused" || fiftyFiftyState === "used") {
            handleSecondChanceInUse(optionClicked)

          } else {
            handleSecondChanceAndFiftyFiftyInUse(optionClicked)
          }
        }
      }
    }
  }

  const wonGame = () => {
    console.log('You won!')
  }

  const lostGame = () => {
    console.log('You lost!')
  }

  const secondChanceActivated = () => {
    if (allLoaded && secondChanceState === 'unused') {
      setSecondChanceState('active')
    }
  }

  const fiftyFiftyActivated = () => {
    if (allLoaded && fiftyFiftyState === "unused") {
      const optionsArray = ["A", "B", "C", "D"]
      if (secondChanceState.startsWith("used:")) {
        const incorrectOptionsArray = []
        for (let i = 0; i < 4; i++) {
          if (questions[questionNumber - 1].answer !== optionsArray[i] || secondChanceState.slice(-1) !== optionsArray[i]) {
            incorrectOptionsArray.push(optionsArray[i])
          }
        }

        if (incorrectOptionsArray.length !== 0) {
          const randomIndex = Math.floor(Math.random() * incorrectOptionsArray.length);
          const removedOption = incorrectOptionsArray[randomIndex];
          setFiftyFiftyState("used: " + removedOption)
        }
      } else {
        const incorrectOptionsArray: string[] = []
        for (let i = 0; i < 4; i++) {
          if (questions[questionNumber - 1].answer !== optionsArray[i]) {
            incorrectOptionsArray.push(optionsArray[i])
          }
        }

        const removedOptions: string[] = [];
        if (incorrectOptionsArray.length > 1) {
          while (removedOptions.length < 2) {
            const randomIndex = Math.floor(Math.random() * incorrectOptionsArray.length);
            const selectedOption = incorrectOptionsArray[randomIndex];
            if (!removedOptions.includes(selectedOption)) {
              removedOptions.push(selectedOption);
            }
          }
        }

        setFiftyFiftyState("used: " + removedOptions[0] + removedOptions[1])
      }
    }
  }

  const freezeActivated = () => {
    if (allLoaded && freezeState === "unused") {
      freezeState = "active"
    }
  }

  const handleSecondChanceInUse = (optionClicked: string) => {
    if (optionClicked === questions[questionNumber - 1].answer) {
      setOptionChosen(optionClicked)
      selectedOption = true
      const answerInterval = setInterval(() => {
        if (questionNumber === 10) {
          wonGame()
          clearInterval(answerInterval)
        } else {
          setAllLoaded(false)
          setQuestionNumber(questionNumber + 1)
          setOptions([])
          setTimer(30)
          selectedOption = false
          setOptionChosen('')
          setQuestionText('')
          setSecondChanceState("used")
          clearInterval(answerInterval)
        }
      }, 3000)
    } else {
      setOptionChosen('')
      if (secondChanceState === "active") {
        setSecondChanceState("used: " + optionClicked)
      } else {
        setOptionChosen(optionClicked)
        selectedOption = true
        lostGame()
      }
    }
  }

  const handleFiftyFiftyInUse = (optionClicked: string) => {
    if (optionClicked === questions[questionNumber - 1].answer) {
      setOptionChosen(optionClicked)
      selectedOption = true
      const answerInterval = setInterval(() => {
        if (questionNumber === 10) {
          wonGame()
          clearInterval(answerInterval)
        } else {
          setAllLoaded(false)
          setQuestionNumber(questionNumber + 1)
          setOptions([])
          setTimer(30)
          selectedOption = false
          setOptionChosen('')
          setQuestionText('')
          setFiftyFiftyState("used")
          clearInterval(answerInterval)
        }
      }, 3000)
    } else {
      setOptionChosen(optionClicked)
      selectedOption = true
      lostGame()
    }
  }

  const handleSecondChanceAndFiftyFiftyInUse = (optionClicked: string) => {
    if (optionClicked === questions[questionNumber - 1].answer) {
      setOptionChosen(optionClicked)
      selectedOption = true
      const answerInterval = setInterval(() => {
        if (questionNumber === 10) {
          wonGame()
          clearInterval(answerInterval)
        } else {
          setAllLoaded(false)
          setQuestionNumber(questionNumber + 1)
          setOptions([])
          setTimer(30)
          selectedOption = false
          setOptionChosen('')
          setQuestionText('')
          setSecondChanceState("used")
          setFiftyFiftyState("used")
          clearInterval(answerInterval)
        }
      }, 3000)
    } else {
      setOptionChosen('')
      if (secondChanceState === "active") {
        setSecondChanceState("used: " + optionClicked)
      } else {
        setOptionChosen(optionClicked)
        selectedOption = true
        lostGame()
      }
    }
  }

  return (
    <section>
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-center h-12 md:h-16">Question {questionNumber}</h2>
      <h3 className="flex justify-center text-center font-bold text-3xl sm:text-4xl md:text-5xl h-24 md:h-16">{questionText}</h3>
      <section className="flex flex-wrap justify-between items-center h-24 mb-8">
        <div className="w-auto sm:w-powerups flex flex-wrap items-center gap-2">
          <button onClick={secondChanceActivated}><FaHeartCirclePlus title="Second chance" color="red" className={`${secondChanceState === "active" ? "bg-red-300" : secondChanceState === "unused" ? "hover:cursor-pointer hover:bg-red-200" : "hidden"} w-16 sm:w-24 md:w-36 h-12 md:h-16 border-4 border-red-500 py-2`} /></button>
          <button onClick={fiftyFiftyActivated} title="Choose between two options" className={`${fiftyFiftyState !== "unused" ? "hidden" : ""} flex justify-center items-center sm:w-24 md:w-36 h-12 md:h-16 border-4 border-green-400 text-green-400 text-base md:text-2xl p-2 hover:cursor-pointer hover:bg-green-200`}>50/50</button>
          <button onClick={freezeActivated} className={`${freezeState === "used" ? "hidden" : ""} relative w-16 sm:w-24 md:w-36 h-12 md:h-16 border-4 border-sky-300 py-2 hover:cursor-pointer hover:bg-sky-100`}>
            <FaRegSnowflake
              title="Freeze time for 30 seconds"
              color="#BAE6FD"
              className="w-full h-full"
            />
            {freezeUsed && (
              <div className="absolute inset-0 bg-sky-500 opacity-40 h-full animate-freeze"></div>
            )}
          </button>
        </div>
        <div className="flex justify-center items-center w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 border-4 text-yellow-500 border-yellow-500 rounded-full text-2xl sm:text-3xl md:text-4xl">{timer}</div>
      </section>
      <section className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 h-options-small md:h-options text-center hover:cursor-pointer">
        <button onClick={() => handleOptionClick('A')} className={`${secondChanceState === "used: A" || fiftyFiftyState.includes("A") ? "invisible" : "visible"} flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4
          ${selectedOption && optionChosen === 'A' && questions[questionNumber - 1].answer === 'A' ? 'bg-green-500 border-green-600'
            : selectedOption && optionChosen === 'A' && questions[questionNumber - 1].answer !== 'A' ? 'bg-red-500 border-red-600'
              : selectedOption && optionChosen !== 'A' && questions[questionNumber - 1].answer == 'A' ? 'bg-green-500 border-green-600'
                : selectedOption && optionChosen !== 'A' && questions[questionNumber - 1].answer !== 'A' ? 'opacity-50 bg-gray-600 border-gray-800'
                  : 'bg-red-300 border-red-500 hover:bg-red-400'}`}>
          {options[0]}
        </button>
        <button onClick={() => handleOptionClick('B')} className={`${secondChanceState === "used: B" || fiftyFiftyState.includes("B") ? "invisible" : "visible"} flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4
          ${selectedOption && optionChosen === 'B' && questions[questionNumber - 1].answer === 'B' ? 'bg-green-500 border-green-600'
            : selectedOption && optionChosen === 'B' && questions[questionNumber - 1].answer !== 'B' ? 'bg-red-500 border-red-600'
              : selectedOption && optionChosen !== 'B' && questions[questionNumber - 1].answer == 'B' ? 'bg-green-500 border-green-600'
                : selectedOption && optionChosen !== 'B' && questions[questionNumber - 1].answer !== 'B' ? 'opacity-50 bg-gray-600 border-gray-800'
                  : 'bg-blue-300 border-blue-500 hover:bg-blue-400'}`}>
          {options[1]}
        </button>
        <button onClick={() => handleOptionClick('C')} className={`${secondChanceState === "used: C" || fiftyFiftyState.includes("C") ? "invisible" : "visible"} flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4
          ${selectedOption && optionChosen === 'C' && questions[questionNumber - 1].answer === 'C' ? 'bg-green-500 border-green-600'
            : selectedOption && optionChosen === 'C' && questions[questionNumber - 1].answer !== 'C' ? 'bg-red-500 border-red-600'
              : selectedOption && optionChosen !== 'C' && questions[questionNumber - 1].answer == 'C' ? 'bg-green-500 border-green-600'
                : selectedOption && optionChosen !== 'C' && questions[questionNumber - 1].answer !== 'C' ? 'opacity-50 bg-gray-600 border-gray-800'
                  : 'bg-yellow-300 border-yellow-500 hover:bg-yellow-400'}`}>
          {options[2]}
        </button>
        <button onClick={() => handleOptionClick('D')} className={`${secondChanceState === "used: D" || fiftyFiftyState.includes("D") ? "invisible" : "visible"} flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4
          ${selectedOption && optionChosen === 'D' && questions[questionNumber - 1].answer === 'D' ? 'bg-green-500 border-green-600'
            : selectedOption && optionChosen === 'D' && questions[questionNumber - 1].answer !== 'D' ? 'bg-red-500 border-red-600'
              : selectedOption && optionChosen !== 'D' && questions[questionNumber - 1].answer == 'D' ? 'bg-green-500 border-green-600'
                : selectedOption && optionChosen !== 'D' && questions[questionNumber - 1].answer !== 'D' ? 'opacity-50 bg-gray-600 border-gray-800'
                  : 'bg-green-300 border-green-500 hover:bg-green-400'}`}>
          {options[3]}
        </button>
      </section>
    </section>
  )
}

export default Quiz
