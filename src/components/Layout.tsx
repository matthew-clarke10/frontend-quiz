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
      <div className="flex justify-between items-center bg-blue-500">
        {quizPage && (
          <Link to="/" className="px-3 py-2 ml-2 w-60 md:w-72 font-bold text-center hover:bg-blue-600 sm:ml-4 md:ml-8 text-base sm:text-lg md:text-2xl">Home</Link>
        )}
        <h1 className={`flex justify-center items-center h-header bg-blue-500 w-full font-bold text-center ${quizPage ? 'text-xl sm:text-3xl md:text-5xl' : 'text-5xl'}`}>{quizPage ? `Quiz: ${headerText}` : 'Front-end Quizzes'}</h1>
        {quizPage && (
          <button onClick={toggleMusicEnabled} className={`w-60 md:w-72 font-bold whitespace-nowrap mr-2 sm:mr-4 md:mr-8 px-2 py-1 sm:px-4 sm:py-2 text-base sm:text-lg md:text-2xl ${musicEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>{musicEnabled ? 'Music Enabled' : 'Music Disabled'}</button>
        )}
      </div>
      <main className="bg-gray-100 p-4 h-body">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
