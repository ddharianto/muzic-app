import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsExplicitFill } from 'react-icons/bs';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/musicPlayerSlice';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const artistDetails = (adamid) => {
  const {
    data: artistData,
    isFetching,
    error,
  } = useGetArtistDetailsQuery(adamid);

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  return artistData?.data[0]?.attributes?.url || '/pagenotfound';
};

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
  const { isActive } = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[180px] lg:w-[220px] p-4 bg-black/80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative self-center w-36 h-36 lg:w-48 lg:h-48 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title ? 'flex z-10' : 'hidden'
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
          className={`w-full h-full rounded-full ${
            activeSong?.title === song.title && isPlaying && isActive
              ? ' animate-spinslow'
              : ''
          }`}
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="flex flex-row justify-start items-center text-white group">
          <Link
            to={`/songs/${song?.key}`}
            // to={`/songs/665462884`} // mock id
            className="truncate max-w-[165px] font-semibold text-sm lg:text-[15px] hover:underline"
          >
            {song.title}
          </Link>{' '}
          <span className="absolute w-auto p-2 m-2 min-w-max bottom-14 start-1 rounded-md shadow-md text-white bg-gray-900 text-sm transition-all duration-100 scale-0 origin-left group-hover:scale-100">
            {song.title}
          </span>
          {song?.hub?.explicit && (
            <BsExplicitFill className="w-4 h-4 ml-2 text-secondary-400 font-bold" />
          )}
        </p>
        <p className="text-sm truncate text-white mt-1 hover:underline group">
          <Link to={artistDetails(song?.artists[0]?.adamid)} target="_blank">
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
