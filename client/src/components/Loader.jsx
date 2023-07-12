import React from 'react';

import { record_logo } from '../assets';

const Loader = ({ title }) => (
  <div className="w-full min-h-screen flex justify-center items-center flex-col">
    <img
      src={record_logo}
      alt="loader"
      className="w-32  mt-5 object-contain animate-spin"
    />
    <h1 className="font-bold text-2xl text-white mt-2">{title}</h1>
  </div>
);

export default Loader;
