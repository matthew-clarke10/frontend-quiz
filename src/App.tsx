import { Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import Quizzes from './components/Quizzes'
import TimeTrial from './components/TimeTrial'
import Layout from './components/Layout'
import Quiz from './components/Quiz'
import htmlQuizData from './data/htmlQuizData'
import cssQuizData from './data/cssQuizData'
import jsQuizData from './data/jsQuizData'
import allQuizData from './data/allQuizData'
import { useEffect, useState } from 'react'

function App() {
  const [musicEnabled, setMusicEnabled] = useState<boolean>(false)

  useEffect(() => {
    async function checkMusicEnabled() {
      const isMusicEnabledObject = localStorage.getItem("isMusicEnabled")
      const isMusicEnabled = isMusicEnabledObject ? JSON.parse(isMusicEnabledObject) === true : false
      setMusicEnabled(isMusicEnabled)
    }

    checkMusicEnabled()
  })

  function toggleMusicEnabled() {
    if (musicEnabled) {
      localStorage.setItem("isMusicEnabled", "false")
      setMusicEnabled(false)
    } else {
      localStorage.setItem("isMusicEnabled", "true")
      setMusicEnabled(true)
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Layout toggleMusicEnabled={toggleMusicEnabled} musicEnabled={musicEnabled} />}>
        <Route index element={<Menu toggleMusicEnabled={toggleMusicEnabled} musicEnabled={musicEnabled} />} />
        <Route path="quizzes">
          <Route index element={<Quizzes />} />
          <Route path="html" element={<Quiz quizData={htmlQuizData} musicEnabled={musicEnabled} />} />
          <Route path="css" element={<Quiz quizData={cssQuizData} musicEnabled={musicEnabled} />} />
          <Route path="js" element={<Quiz quizData={jsQuizData} musicEnabled={musicEnabled} />} />
          <Route path="all" element={<Quiz quizData={allQuizData} musicEnabled={musicEnabled} />} />
        </Route>
        <Route path="time-trial" element={<TimeTrial />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  )
}

export default App