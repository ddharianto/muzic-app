import React from 'react';

import { record_logo } from '../assets';

const Error = () => (
  <div className="w-full min-h-screen flex justify-center items-center flex-col animate-spinslow">
    <img
      src={record_logo}
      alt="loader"
      className="w-[500px] mt-5 object-contain"
    />
    <div className="absolute flex flex-col justify-center items-center top-0 inset-y-0 gap-4">
      <h1 className="font-bold text-4xl text-white">ERROR</h1>
      <h1 className="font-bold text-base text-white mt-10">
        Something went wrong
      </h1>
    </div>
  </div>
);

export default Error;
