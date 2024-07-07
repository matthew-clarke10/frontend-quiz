import { Link, Outlet, useLocation } from 'react-router-dom'

interface LayoutProps {
  toggleMusicEnabled: () => void;
  musicEnabled: boolean;
}

const Layout: React.FC<LayoutProps> = ({ toggleMusicEnabled, musicEnabled }) => {
  const location = useLocation()
  const quizPage =
    location.pathname.startsWith('/quizzes/html') ||
    location.pathname.startsWith('/quizzes/css') ||
    location.pathname.startsWith('/quizzes/js') ||
    location.pathname.startsWith('/quizzes/all')

  const headerText =
    location.pathname.startsWith('/quizzes/html') ? 'HTML' :
      location.pathname.startsWith('/quizzes/css') ? 'CSS' :
        location.pathname.startsWith('/quizzes/js') ? 'JS' :
          location.pathname.startsWith('/quizzes/all') ? 'All' :
            'nonQuiz'
  return (
    <>
      <nav className="flex justify-between items-center h-header-small md:h-header bg-blue-500">
        {quizPage && (
          <Link to="/" className="flex justify-center items-center h-full px-1 w-80 md:w-96 font-bold text-center border-4 bg-blue-600 hover:bg-blue-700 border-blue-700 hover:border-blue-800 text-base sm:text-xl md:text-3xl">Home</Link>
        )}
        <h1 className={`flex justify-center items-center h-full bg-blue-500 border-y-4 border-blue-600  w-full font-bold text-center ${quizPage ? 'text-xl sm:text-3xl md:text-5xl' : 'text-3xl md:text-5xl'}`}>{quizPage ? `Quiz: ${headerText}` : 'Front-end Quizzes'}</h1>
        {quizPage && (
          <button onClick={toggleMusicEnabled} className={`h-full px-1 w-80 md:w-96 font-bold whitespace-nowrap text-base sm:text-xl md:text-3xl border-4 ${musicEnabled ? 'bg-green-500 hover:bg-green-600 border-green-700' : 'bg-red-500 hover:bg-red-600 border-red-700'}`}>{musicEnabled ? 'Music Enabled' : 'Music Disabled'}</button>
        )}
      </nav>
      <main className="bg-gray-100 p-4 h-body-large md:h-body">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
