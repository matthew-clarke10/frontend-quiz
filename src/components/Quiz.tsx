import { FaHeartCirclePlus } from 'react-icons/fa6'
import { FaRegSnowflake } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { QuizData } from '../data/quizTypes'
import { Link } from 'react-router-dom'

let selectedOption = false
let freezeState = "unused"
let freezeTimeout: NodeJS.Timeout;

const Quiz: React.FC<QuizData> = (quizData) => {
  const [questionNumber, setQuestionNumber] = useState(1)
  const [questionText, setQuestionText] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [allLoaded, setAllLoaded] = useState(false)
  const [timer, setTimer] = useState(30)
  const [optionChosen, setOptionChosen] = useState('')
  const [secondChanceState, setSecondChanceState] = useState('unused')
  const [fiftyFiftyState, setFiftyFiftyState] = useState('unused')
  const [freezeUsed, setFreezeUsed] = useState(false)
  const [gameState, setGameState] = useState("playing")
  const [highScore, setHighScore] = useState(false)

  useEffect(() => {
    const resetVariables = () => {
      selectedOption = false
      freezeState = "unused"
    }

    const lostGame = () => {
      setGameState("lose")
      resetVariables()
    }

    const loadQuestionText = () => {
      let index = 0
      const question = quizData.questions[questionNumber - 1].question
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
      const options = quizData.questions[questionNumber - 1].options
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
          freezeTimeout = setTimeout(() => {
            const secondTimerInterval = setInterval(() => {
              freezeState = "used"
              clearTimeout(freezeTimeout)
              if (selectedOption) {
                clearInterval(timerInterval)
                clearInterval(secondTimerInterval)
                clearTimeout(freezeTimeout)
              } else {
                setTimer(--time)
              }

              if (time === 0) {
                clearInterval(timerInterval)
                clearInterval(secondTimerInterval)
                clearTimeout(freezeTimeout)
                lostGame()
              }
            }, 1000)
          }, 30000)

          if (selectedOption) {
            console.log('hey')
            clearInterval(timerInterval)
            clearTimeout(freezeTimeout)
          }
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
      loadQuestionText();
    }

    if (allLoaded) {
      startTimer();
    }
  }, [quizData.questions, questionText, questionNumber, allLoaded]);

  const resetForNextQuestion = () => {
    setAllLoaded(false)
    setQuestionNumber(questionNumber + 1)
    setOptions([])
    setTimer(30)
    selectedOption = false
    setOptionChosen('')
    setQuestionText('')
  }

  const handleOptionClick = (optionClicked: string) => {
    if (freezeState === "active") {
      freezeState = "used"
      clearTimeout(freezeTimeout)
    }

    if (!selectedOption) {
      if (allLoaded) {
        if (secondChanceState === "unused" || secondChanceState === "used") {
          if (fiftyFiftyState === "unused" || fiftyFiftyState === "used") {
            setOptionChosen(optionClicked)
            selectedOption = true
            const answerInterval = setInterval(() => {
              if (optionClicked === quizData.questions[questionNumber - 1].answer) {
                if (questionNumber === 10) {
                  wonGame()
                } else {
                  resetForNextQuestion()
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

  const newGame = () => {
    setGameState("playing")
    setQuestionNumber(1)
    setQuestionText("")
    setOptions([])
    setAllLoaded(false)
    setTimer(30)
    setOptionChosen("")
    setSecondChanceState("unused")
    setFiftyFiftyState("unused")
    setFreezeUsed(false)
    setGameState("playing")
    setHighScore(false)
  }

  const resetVariables = () => {
    selectedOption = false
    freezeState = "unused"
  }

  const wonGame = () => {
    setGameState("win")
    resetVariables()
    if (isHighScore()) {
      setHighScore(true)
    }
  }

  const lostGame = () => {
    setGameState("lose")
    resetVariables()
    if (isHighScore()) {
      setHighScore(true)
    }
  }

  const isHighScore = () => {
    const highScoreString = localStorage.getItem(`${quizData.type}QuizHighScore`)
    if (highScoreString) {
      const highScore = Number(highScoreString)
      if (questionNumber > highScore + 1) {
        localStorage.setItem("htmlQuizHighScore", (questionNumber - 1).toString())
        console.log('hi')
        return true
      }
    } else {
      localStorage.setItem("htmlQuizHighScore", (questionNumber - 1).toString())
    }

    return false
  }

  const secondChanceActivated = () => {
    if (allLoaded && !selectedOption && secondChanceState === 'unused') {
      setSecondChanceState('active')
    }
  }

  const fiftyFiftyActivated = () => {
    if (allLoaded && !selectedOption && fiftyFiftyState === "unused") {
      const optionsArray = ["A", "B", "C", "D"]
      if (secondChanceState.startsWith("used:")) {
        const incorrectOptionsArray = []
        for (let i = 0; i < 4; i++) {
          if (quizData.questions[questionNumber - 1].answer !== optionsArray[i] || secondChanceState.slice(-1) !== optionsArray[i]) {
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
          if (quizData.questions[questionNumber - 1].answer !== optionsArray[i]) {
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
    if (allLoaded && !selectedOption && freezeState === "unused") {
      freezeState = "active"
    }
  }

  const handleSecondChanceInUse = (optionClicked: string) => {
    if (optionClicked === quizData.questions[questionNumber - 1].answer) {
      setOptionChosen(optionClicked)
      selectedOption = true
      const answerInterval = setInterval(() => {
        if (questionNumber === 10) {
          wonGame()
          clearInterval(answerInterval)
        } else {
          resetForNextQuestion()
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
        const freezeTimeout = setTimeout(() => {
          clearTimeout(freezeTimeout)
          lostGame()
        }, 3000)
      }
    }
  }

  const handleFiftyFiftyInUse = (optionClicked: string) => {
    if (optionClicked === quizData.questions[questionNumber - 1].answer) {
      setOptionChosen(optionClicked)
      selectedOption = true
      const answerInterval = setInterval(() => {
        if (questionNumber === 10) {
          wonGame()
          clearInterval(answerInterval)
        } else {
          resetForNextQuestion()
          setFiftyFiftyState("used")
          clearInterval(answerInterval)
        }
      }, 3000)
    } else {
      setOptionChosen(optionClicked)
      selectedOption = true
      const freezeTimeout = setTimeout(() => {
        clearTimeout(freezeTimeout)
        lostGame()
      }, 3000)
    }
  }

  const handleSecondChanceAndFiftyFiftyInUse = (optionClicked: string) => {
    if (optionClicked === quizData.questions[questionNumber - 1].answer) {
      setOptionChosen(optionClicked)
      selectedOption = true
      const answerInterval = setInterval(() => {
        if (questionNumber === 10) {
          wonGame()
          clearInterval(answerInterval)
        } else {
          resetForNextQuestion()
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
        const freezeTimeout = setTimeout(() => {
          clearTimeout(freezeTimeout)
          lostGame()
        }, 3000)
      }
    }
  }

  if (gameState === "win") {
    return (
      <div>Win</div>
    )
  } else if (gameState === "lose") {
    return (
      <section className="md:h-main aspect-square md:aspect-auto flex flex-col justify-center items-center gap-8 p-8 sm:p-16 bg-white border-4 border-gray-300 shadow-lg rounded-lg text-lg xs:text-2xl md:text-4xl text-center">
        <div className="text-2xl xs:text-4xl md:text-6xl">Game over</div>
        <div className="text-2xl xs:text-4xl md:text-6xl">
          {questionNumber !== 1 ? (
            <>
              You completed level {questionNumber - 1} {highScore && <span className="text-nowrap">(New highscore)</span>}
            </>
          ) : (
            "You completed no levels"
          )}
        </div>
        <button onClick={newGame} className="w-full sm:w-[532px] px-4 md:px-8 py-3 md:py-6 text-center bg-green-500 hover:bg-green-600">Play Again</button>
        <Link to="/" className="w-full sm:w-[532px] px-4 md:px-8 py-3 md:py-6 text-center bg-blue-500 hover:bg-blue-600">Back to Home</Link>
      </section>
    )
  } else {
    return (
      <section>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center h-12 md:h-16">Question {questionNumber}</h2>
        <h3 className="flex justify-center text-center font-bold text-3xl sm:text-4xl md:text-5xl h-24 md:h-16">{questionText}</h3>
        <section className="flex flex-wrap justify-between items-center h-24 mb-8">
          <div className="w-auto sm:w-powerups flex flex-wrap items-center gap-2">
            <button onClick={secondChanceActivated}><FaHeartCirclePlus title="Second chance" color="red" className={`${secondChanceState === "active" ? "bg-red-300" : secondChanceState === "unused" ? "hover:cursor-pointer hover:bg-red-200" : "hidden"} w-16 sm:w-24 md:w-36 h-12 md:h-16 border-4 border-red-500 py-2`} /></button>
            <button onClick={fiftyFiftyActivated} title="Choose between two options" className={`${fiftyFiftyState !== "unused" ? "hidden" : ""} flex justify-center items-center sm:w-24 md:w-36 h-12 md:h-16 border-4 border-green-400 text-green-400 text-base md:text-2xl p-2 hover:cursor-pointer hover:bg-green-200`}>50/50</button>
            <button onClick={freezeActivated} className={`${freezeState === "active" ? "" : freezeState === "unused" ? "hover:cursor-pointer hover:bg-sky-100" : "hidden"}  relative w-16 sm:w-24 md:w-36 h-12 md:h-16 border-4 border-sky-300 py-2 hover:cursor-pointer`}>
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
          ${selectedOption && optionChosen === 'A' && quizData.questions[questionNumber - 1].answer === 'A' ? 'bg-green-500 border-green-600'
              : selectedOption && optionChosen === 'A' && quizData.questions[questionNumber - 1].answer !== 'A' ? 'bg-red-500 border-red-600'
                : selectedOption && optionChosen !== 'A' && quizData.questions[questionNumber - 1].answer == 'A' ? 'bg-green-500 border-green-600'
                  : selectedOption && optionChosen !== 'A' && quizData.questions[questionNumber - 1].answer !== 'A' ? 'opacity-50 bg-gray-600 border-gray-800'
                    : 'bg-red-300 border-red-500 hover:bg-red-400'}`}>
            {options[0]}
          </button>
          <button onClick={() => handleOptionClick('B')} className={`${secondChanceState === "used: B" || fiftyFiftyState.includes("B") ? "invisible" : "visible"} flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4
          ${selectedOption && optionChosen === 'B' && quizData.questions[questionNumber - 1].answer === 'B' ? 'bg-green-500 border-green-600'
              : selectedOption && optionChosen === 'B' && quizData.questions[questionNumber - 1].answer !== 'B' ? 'bg-red-500 border-red-600'
                : selectedOption && optionChosen !== 'B' && quizData.questions[questionNumber - 1].answer == 'B' ? 'bg-green-500 border-green-600'
                  : selectedOption && optionChosen !== 'B' && quizData.questions[questionNumber - 1].answer !== 'B' ? 'opacity-50 bg-gray-600 border-gray-800'
                    : 'bg-blue-300 border-blue-500 hover:bg-blue-400'}`}>
            {options[1]}
          </button>
          <button onClick={() => handleOptionClick('C')} className={`${secondChanceState === "used: C" || fiftyFiftyState.includes("C") ? "invisible" : "visible"} flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4
          ${selectedOption && optionChosen === 'C' && quizData.questions[questionNumber - 1].answer === 'C' ? 'bg-green-500 border-green-600'
              : selectedOption && optionChosen === 'C' && quizData.questions[questionNumber - 1].answer !== 'C' ? 'bg-red-500 border-red-600'
                : selectedOption && optionChosen !== 'C' && quizData.questions[questionNumber - 1].answer == 'C' ? 'bg-green-500 border-green-600'
                  : selectedOption && optionChosen !== 'C' && quizData.questions[questionNumber - 1].answer !== 'C' ? 'opacity-50 bg-gray-600 border-gray-800'
                    : 'bg-yellow-300 border-yellow-500 hover:bg-yellow-400'}`}>
            {options[2]}
          </button>
          <button onClick={() => handleOptionClick('D')} className={`${secondChanceState === "used: D" || fiftyFiftyState.includes("D") ? "invisible" : "visible"} flex justify-center items-center h-full p-4 text-2xl sm:text-3xl md:text-4xl border-4
          ${selectedOption && optionChosen === 'D' && quizData.questions[questionNumber - 1].answer === 'D' ? 'bg-green-500 border-green-600'
              : selectedOption && optionChosen === 'D' && quizData.questions[questionNumber - 1].answer !== 'D' ? 'bg-red-500 border-red-600'
                : selectedOption && optionChosen !== 'D' && quizData.questions[questionNumber - 1].answer == 'D' ? 'bg-green-500 border-green-600'
                  : selectedOption && optionChosen !== 'D' && quizData.questions[questionNumber - 1].answer !== 'D' ? 'opacity-50 bg-gray-600 border-gray-800'
                    : 'bg-green-300 border-green-500 hover:bg-green-400'}`}>
            {options[3]}
          </button>
        </section>
      </section>
    )
  }
}

export default Quiz
