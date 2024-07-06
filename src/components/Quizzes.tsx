import { FaHtml5, FaCss3Alt, FaJsSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Quizzes() {
  return (
    <>
      <h2 className="flex justify-center items-center h-16 text-4xl font-bold mb-4">Quiz Selection</h2>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 h-auto">
        <Link to="/quizzes/html" className="flex justify-center items-center w-full h-32 md:h-48 p-4 text-6xl bg-orange-100 text-orange-600 hover:bg-orange-200 hover:border-4 hover:border-orange-300 hover:cursor-pointer">
          <FaHtml5 title="HTML" />
        </Link>
        <Link to="/quizzes/css" className="flex justify-center items-center w-full h-32 md:h-48 p-4 text-6xl bg-blue-100 text-blue-600 hover:bg-blue-200 hover:border-4 hover:border-blue-300 hover:cursor-pointer">
          <FaCss3Alt title="CSS" />
        </Link>
        <Link to="/quizzes/js" className="flex justify-center items-center w-full h-32 md:h-48 p-4 text-6xl bg-yellow-100 text-yellow-500 hover:bg-yellow-200 hover:border-4 hover:border-yellow-300 hover:cursor-pointer">
          <FaJsSquare title="JavaScript" />
        </Link>
        <Link to="/quizzes/all" className="flex justify-center items-center w-full h-32 md:h-48 p-4 text-6xl bg-gray-200 text-gray-700 hover:bg-gray-300 hover:border-4 hover:border-gray-400 hover:cursor-pointer">
          All
        </Link>
      </section>
    </>
  );
}

export default Quizzes;
