
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-gray-500 border-t">
        <p>&copy; {new Date().getFullYear()} AI Trip Planner. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
