import React from 'react';
import { Link } from 'react-router-dom';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex sm:w-[350px] items-center justify-center">
    <div
      className={`${
        isPlaying && isActive
          ? 'relative animate-[spin_3s_linear_infinite]'
          : ''
      } relative hidden sm:block h-16 w-16 mr-2`}
    >
      <img
        src={activeSong?.images?.coverart}
        alt="cover art"
        className="rounded-full"
      />
      <div className="absolute h-5 w-5 m-auto top-0 bottom-0 left-0 right-0 bg-red-700 z-10 rounded-full "></div>
      <div className="absolute h-1 w-1 m-auto top-0 bottom-0 left-0 right-0 bg-black z-10 rounded-full "></div>
    </div>
    <div className="w-[50%]">
      <p className="font-semibold text-lg text-white  truncate hover:underline">
        <Link to={`/songs/${activeSong?.key}`}>{activeSong.title}</Link>
      </p>
      <p className="text-sm truncate text-gray-300 mt-1 hover:underline">
        <Link
          to={
            activeSong.artists
              ? `/artists/${activeSong?.artists[0]?.adamid}`
              : '/top-artists'
          }
        >
          {activeSong.subtitle}
        </Link>
      </p>
    </div>
  </div>
);

export default Track;
