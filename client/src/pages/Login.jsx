import React from 'react';

import { record_logo } from '../assets';

const Login = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col animate-spinslow">
      <img
        src={record_logo}
        alt="loader"
        className="w-[500px] mt-5 object-contain"
      />
      LOGIN
    </div>
  );
};

export default Login;
