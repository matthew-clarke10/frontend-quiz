import { Route, Routes } from "react-router-dom"
import Menu from "./components/Menu"
import Quizzes from "./components/Quizzes"
import TimeTrial from "./components/TimeTrial"
import Layout from "./components/Layout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Menu />} />
        <Route path="/quizzes" element={<Quizzes />}>
          {/*<Route path="html" element={<Quiz {...quizData.html} />} />
          <Route path="css" element={<Quiz {...quizData.css} />} />
          <Route path="js" element={<Quiz {...quizData.js} />} />
          <Route path="all" element={<Quiz {...quizData.all} />} />*/}
        </Route>
        <Route path="/time-trial" element={<TimeTrial />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  )
}

export default App