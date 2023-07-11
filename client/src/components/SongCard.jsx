import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BsExplicit } from 'react-icons/bs';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[220px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-48 h-48 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          src={song.images?.coverart}
          className="w-full h-full rounded-full"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="flex flex-row justify-start items-center text-white group">
          <Link
            to={`/songs/${song?.key}`}
            // to={`/songs/665462884`} // mock id
            className="truncate max-w-[195px] font-semibold text-[15px] hover:underline"
          >
            {song.title}
          </Link>{' '}
          <span className="absolute w-auto p-2 m-2 min-w-max bottom-14 start-1 rounded-md shadow-md text-white bg-gray-900 text-sm transition-all duration-100 scale-0 origin-left group-hover:scale-100">
            {song.title}
          </span>
          {song?.hub?.explicit && <BsExplicit className="w-4 h-4 ml-2" />}
        </p>
        <p className="text-sm truncate text-gray-300 mt-1 hover:underline group">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : '/top-artists'
            }
          >
            {song.subtitle}
          </Link>
          <span className="absolute w-auto p-2 m-2 min-w-max -bottom-8 start-1 rounded-md shadow-md text-white bg-gray-900 text-sm transition-all duration-100 scale-0 origin-left group-hover:scale-100">
            {song.subtitle}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
