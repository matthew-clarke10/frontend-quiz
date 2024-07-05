import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <h1 className="flex justify-center items-center h-32 text-5xl bg-blue-500">Front-end Quiz</h1>
      <main className="bg-gray-100 p-4">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
