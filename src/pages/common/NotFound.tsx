import React from "react";

const NotFound: React.FC = () => {

  return (
    <div className="h-screen w-full p-2 flex flex-col items-center justify-center">
      <h1 className="sm:text-6xl text-5xl font-bold mb-4">404</h1>
      <p className="sm:text-2xl text-xl mb-4">Page Not Found</p>
      <p className="sm:text-lg text-md mb-8">The page you're looking for doesn't exist.</p>
      <button
        className="font-bold py-2 px-4 rounded"
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
