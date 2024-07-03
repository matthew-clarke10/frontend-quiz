import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <h1>Front-end Quiz</h1>
        </>
      } />
      <Route path="*" element={
        <>
          <h1>Not Found</h1>
        </>
      } />
    </Routes>
  )
}

export default App
