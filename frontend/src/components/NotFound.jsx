import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Not Found</h1>
      <p className="text-gray-700 mb-4">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 hover:underline">Go back to home</Link>
    </div>
  );
};

export default NotFound;
