import React from "react";
import { Link } from "react-router-dom";
// import { ExclamationTriangleIcon } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 bg-[url('./assets/images/plank-not-found.jpg')]">
      <div className="absolute  right-20 max-w-lg bg-gray-50/75  px-10 py-10">
        {/* <ExclamationTriangleIcon 
          className="mx-auto mb-6 text-red-500" 
          size={120} 
        /> */}

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>

        <p className="text-gray-600 mb-6 text-lg">
          Oops! The page you are looking for seems to have wandered off into the
          digital wilderness. Let's get you back on track.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition-colors duration-300 
                     shadow-md hover:shadow-lg">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
