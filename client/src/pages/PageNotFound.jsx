import React from 'react';

import { record_logo } from '../assets';

const PageNotFound = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col animate-spinslow">
      <img
        src={record_logo}
        alt="loader"
        className="w-[500px] mt-5 object-contain"
      />
      <div className="absolute flex flex-col justify-center items-center top-0 inset-y-0 gap-4">
        <h1 className="font-bold text-4xl text-white">404</h1>
        <h1 className="font-bold text-base text-white mt-10">Page not found</h1>
      </div>
    </div>
  );
};

export default PageNotFound;
