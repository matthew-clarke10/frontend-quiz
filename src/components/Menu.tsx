import { Link } from "react-router-dom"

interface LayoutProps {
  toggleMusicEnabled: () => void;
  musicEnabled: boolean;
}

const Menu: React.FC<LayoutProps> = ({ toggleMusicEnabled, musicEnabled }) => {
  return (
    <section className="md:h-main aspect-square md:aspect-auto flex flex-col justify-center items-center gap-8 p-8 sm:p-16 bg-white border-4 border-gray-300 shadow-lg rounded-lg text-sm xs:text-xl sm:text-3xl">
      <Link to="/quizzes" className="w-full sm:w-[532px] px-3 xs:px-6 py-2 xs:py-4 text-center bg-blue-500 hover:bg-blue-600">Play</Link>
      <Link to="/time-trial" className="w-full sm:w-[532px] px-3 xs:px-6 py-2 xs:py-4  text-center bg-blue-500 hover:bg-blue-600">Time Trial</Link>
      <button onClick={toggleMusicEnabled} className={`w-full sm:w-[532px] px-3 xs:px-6 py-2 xs:py-4  ${musicEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>{musicEnabled ? 'Music Enabled' : 'Music Disabled'}</button>
    </section>
  )
}

export default Menu