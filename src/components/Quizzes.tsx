import { FaHtml5, FaCss3Alt, FaJsSquare } from 'react-icons/fa';
import { FaStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const getStars = (quizType: string) => {
  const highScoreString = localStorage.getItem(`${quizType}QuizHighScore`)
  if (highScoreString) {
    const highScore = Number(highScoreString)
    if (highScore >= 10) {
      return (
        <div className="h-1/3">
          <FaStar title={`Level ${String(highScore)}`} color="#FFD700" className="h-full w-auto" />
          <FaStar title={`Level ${String(highScore)}`} color="#FFD700" className="h-full w-auto" />
          <FaStar title={`Level ${String(highScore)}`} color="#FFD700" className="h-full w-auto" />
          <FaStar title={`Level ${String(highScore)}`} color="#FFD700" className="h-full w-auto" />
          <FaStar title={`Level ${String(highScore)}`} color="#FFD700" className="h-full w-auto" />
        </div>
      )
    } else if (highScore >= 8) {
      return (
        <div className="h-1/3">
          <FaStar title={`Level ${String(highScore)}`} color="#C0C0C0" className="h-full w-auto" />
          <FaStar title={`Level ${String(highScore)}`} color="#C0C0C0" className="h-full w-auto" />
          <FaStar title={`Level ${String(highScore)}`} color="#C0C0C0" className="h-full w-auto" />
          <FaStar title={`Level ${String(highScore)}`} color="#C0C0C0" className="h-full w-auto" />
        </div>
      )
    } else if (highScore >= 6) {
      return (
        <div className="h-1/3">
          <FaStar title={`Level ${String(highScore)}`} color="#C0C0C0" className="h-full w-auto" />
          <FaStar title={`Level ${String(highScore)}`} color="#C0C0C0" className="h-full w-auto" />
          <FaStar title={`Level ${String(highScore)}`} color="#C0C0C0" className="h-full w-auto" />
        </div>
      )
    } else if (highScore >= 4) {
      return (
        <div className="h-1/3">
          <FaStar title={`Level ${String(highScore)}`} color="#CD7F32" className="h-full w-auto" />
          <FaStar title={`Level ${String(highScore)}`} color="#CD7F32" className="h-full w-auto" />
        </div>
      )
    } else if (highScore >= 2) {
      return (
        <div className="h-1/3">
          <FaStar title={`Level ${String(highScore)}`} color="#CD7F32" className="h-full w-auto" />
        </div>
      )
    }
  }

  return (
    <div className="h-1/3">
      <FaStar title="No stars. Play to earn stars." color="#FFF" className="h-full w-auto" />
    </div>
  )
}

function Quizzes() {
  return (
    <>
      <h2 className="flex justify-center items-center h-16 text-xl md:text-3xl font-bold mb-4">Quiz Selection</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-auto">
        <Link to="/quizzes/html" className="flex flex-col gap-2 justify-between items-center w-full h-40 md:h-64 p-4 text-6xl bg-orange-100 hover:bg-orange-200 hover:border-4 hover:border-orange-300 hover:cursor-pointer">
          <FaHtml5 title="HTML" color="#EA580C" className="h-2/3" />
          {getStars("html")}
        </Link>
        <Link to="/quizzes/css" className="flex flex-col gap-2 justify-between items-center w-full h-40 md:h-64 p-4 text-6xl bg-blue-100 text-blue-600 hover:bg-blue-200 hover:border-4 hover:border-blue-300 hover:cursor-pointer">
          <FaCss3Alt title="CSS" className="h-2/3" />
          {getStars("css")}
        </Link>
        <Link to="/quizzes/js" className="flex flex-col gap-2 justify-between items-center w-full h-40 md:h-64 p-4 text-6xl bg-yellow-100 text-yellow-500 hover:bg-yellow-200 hover:border-4 hover:border-yellow-300 hover:cursor-pointer">
          <FaJsSquare title="JavaScript" className="h-2/3" />
          {getStars("js")}
        </Link>
        <Link to="/quizzes/all" className="flex flex-col justify-between items-center w-full h-40 md:h-64 p-4 bg-gray-200 text-gray-700 hover:bg-gray-300 hover:border-4 hover:border-gray-400 hover:cursor-pointer">
          <div className="flex justify-center items-center h-2/3 text-4xl md:text-6xl">All</div>
          {getStars("all")}
        </Link>
      </section>
    </>
  );
}

export default Quizzes;
