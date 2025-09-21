
import React from 'react';
import { GlobeAltIcon } from './IconComponents';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <GlobeAltIcon className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800 ml-2">
          AI Trip Planner
        </h1>
      </div>
    </header>
  );
};

export default Header;
