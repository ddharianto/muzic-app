import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from 'react-icons/bs';

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => (
  <div className="inline-flex items-center justify-center md:w-[350px]">
    <BsArrowRepeat
      onClick={() => setRepeat((prev) => !prev)}
      className={`hidden sm:block cursor-pointer text-[22px] mx-4 sm:mx-2 ${
        repeat ? 'text-red-600' : 'text-white'
      }`}
    />
    {currentSongs?.length && (
      <MdSkipPrevious
        className="cursor-pointer text-[35px] text-white mx-4 sm:mx-2"
        onClick={handlePrevSong}
      />
    )}
    {isPlaying ? (
      <BsFillPauseFill
        onClick={handlePlayPause}
        className="cursor-pointer text-[45px] text-white mx-4 sm:mx-2"
      />
    ) : (
      <BsFillPlayFill
        onClick={handlePlayPause}
        className="cursor-pointer text-[45px] text-white mx-4 sm:mx-2"
      />
    )}
    {currentSongs?.length && (
      <MdSkipNext
        className="cursor-pointer text-[35px] text-white mx-4 sm:mx-2"
        onClick={handleNextSong}
      />
    )}
    <BsShuffle
      onClick={() => setShuffle((prev) => !prev)}
      className={`hidden sm:block cursor-pointer text-[22px] mx-4 sm:mx-2 ${
        shuffle ? 'text-red-600' : 'text-white'
      }`}
    />
  </div>
);

export default Controls;
