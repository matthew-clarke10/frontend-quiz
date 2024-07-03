import { Route, Routes } from "react-router-dom"
import Menu from "./components/Menu"
import Quizzes from "./components/Quizzes"
import TimeTrial from "./components/TimeTrial"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/quizzes" element={<Quizzes />} />
      <Route path="/time-trial" element={<TimeTrial />} />
      <Route path="*" element={
        <>
          <h1>Not Found</h1>
        </>
      } />
    </Routes>
  )
}

export default App