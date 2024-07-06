import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Menu() {
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
    <section className="flex flex-col justify-center items-center gap-8 p-16 bg-white border-4 border-gray-300 shadow-lg rounded-lg text-3xl">
      <Link to="/quizzes" className="w-80 px-6 py-4 text-center bg-blue-500 hover:bg-blue-600">Play</Link>
      <Link to="/time-trial" className="w-80 px-6 py-4 text-center bg-blue-500 hover:bg-blue-600">Time Trial</Link>
      <button onClick={toggleMusicEnabled} className={`music w-80 px-6 py-4 ${musicEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>{musicEnabled ? 'Music Enabled' : 'Music Disabled'}</button>
    </section>
  )
}

export default Menu