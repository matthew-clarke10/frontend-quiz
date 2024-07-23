import { Link } from "react-router-dom"
import { FaHtml5, FaCss3Alt, FaJsSquare } from 'react-icons/fa';

interface LayoutProps {
  toggleMusicEnabled: () => void;
  musicEnabled: boolean;
}

const Menu: React.FC<LayoutProps> = ({ toggleMusicEnabled, musicEnabled }) => {
  return (
    <section className="md:h-main aspect-square md:aspect-auto flex flex-col justify-center items-center gap-8 p-8 sm:p-16 bg-white border-4 border-gray-300 shadow-lg rounded-lg text-sm xs:text-xl sm:text-3xl">
      <Link to="/quizzes" className="w-full sm:w-[532px] px-3 xs:px-6 py-2 xs:py-4 text-center bg-blue-500 hover:bg-blue-600">Play</Link>
      <button onClick={toggleMusicEnabled} className={`w-full sm:w-[532px] px-3 xs:px-6 py-2 xs:py-4  ${musicEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>{musicEnabled ? 'Music Enabled' : 'Music Disabled'}</button>
      <div className="h-48">
        <div className="flex w-48 justify-between">
          <FaHtml5 title="HTML" color="#EA580C" className="h-24 w-24" />
          <div className="text-blue-600">
            <FaCss3Alt title="CSS" className="h-24 w-24" />
          </div>
        </div>
        <div className="flex w-48 h-24 justify-center">
          <div className="text-yellow-500">
            <FaJsSquare title="JavaScript" className="h-24 w-24" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu