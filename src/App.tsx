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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Menu />} />
        <Route path="quizzes">
          <Route index element={<Quizzes />} />
          <Route path="html" element={<Quiz {...htmlQuizData} />} />
          <Route path="css" element={<Quiz {...cssQuizData} />} />
          <Route path="js" element={<Quiz {...jsQuizData} />} />
          <Route path="all" element={<Quiz {...allQuizData} />} />
        </Route>
        <Route path="time-trial" element={<TimeTrial />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  )
}

export default App