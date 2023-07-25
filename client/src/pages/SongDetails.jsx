import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Error, Loader } from '../components';
import PlayPause from '../components/PlayPause';

import { BsExplicit } from 'react-icons/bs';
import { BiCopyright } from 'react-icons/bi';

import {
  // song_details as data, //mock data to reduce api calls
  apple_music,
} from '../assets';

import { setActiveSong, playPause } from '../redux/features/musicPlayerSlice';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongDetailsQuery(songid);

  const bg_image = data?.images?.background;
  const cover_image = data?.images?.coverart;
  const song_title = data?.title;
  const artist_name = data?.subtitle;
  const artist_id = data?.artists[0]?.adamid;
  const lyrics_footer = data?.sections[1]?.footer;
  const year_released = data?.sections[0]?.metadata[2]?.text;
  const song_label = data?.sections[0]?.metadata[1]?.text;
  const youtube_id = data?.sections[2]?.youtubeurl?.actions[0]?.uri
    .split('/')[3]
    .split('?')[0];

  console.log(data);

  if (isFetching) return <Loader />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      {/* <div className="h-96 w-full bg-black"></div> */}
      <div className="relative w-full flex flex-col">
        <div
          className={
            'xl:h-[600px] h-[300px] w-full bg-cover bg-no-repeat xl:bg-top bg-center'
          }
          style={{ backgroundImage: `url(${bg_image})` }}
        />

        <div className="absolute ml-5 inset-0 flex items-center">
          <img
            alt="profile song"
            src={cover_image}
            className="sm:w-48 w-32 sm:h-48 h-32 rounded-full object-cover shadow-xl shadow-black"
          />

          <div className="ml-5">
            <p className="flex flex-row justify-center items-center font-bold sm:text-2xl text-xl text-white">
              {song_title}
              {data?.hub?.explicit && (
                <BsExplicit className="w-5 h-5 ml-2 mt-1" />
              )}
            </p>
            <Link to={`/artists/${artist_id}`} target="_blank">
              <p className="text-xl text-white mt-2 cursor-pointer hover:underline">
                {artist_name}
              </p>
            </Link>
            <p className="mt-2 px-2 w-fit font-bold tracking-wider text-base text-black rounded-full border-4 border-transparent bg-white">
              {data?.genres?.primary}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 ml-5 mb-2 flex flex-row justify-start items-end xl:items-center gap-8 w-full h-24">
          <div className="flex flex-row justify-start items-center rounded-full border-4 border-transparent bg-white">
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={data}
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(data, 0)}
              className="text-gray-700"
            />
            <p className="text-lg font-medium text-current px-1">
              Play Preview
            </p>
          </div>
          <div className=" rounded border-4 border-transparent bg-white cursor-pointer">
            <Link
              to={data?.hub?.options[0]?.actions[0]?.uri}
              target="_blank"
              className="flex flex-row justify-start items-center"
            >
              <img src={apple_music} alt="Apple Music" className="h-8" />
              <p className="text-lg font-medium text-current px-1">
                Play Full Song
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row my-10 justify-between">
        <div>
          <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

          <div className="mt-5 ml-5">
            {/* {data?.sections[1]?.type === 'LYRICS' ? (
              data?.sections[1]?.text.map((line, i) => ( */}
            {data?.sections[1]?.type === 'LYRICS' ? (
              data?.sections[1]?.text.map((line, i) => (
                <p
                  key={`lyrics-${line}-${i}`}
                  className="text-white text-base my-1"
                >
                  {line}
                </p>
              ))
            ) : (
              <p className="text-white text-base my-1">
                Sorry, No lyrics found!
              </p>
            )}

            <p className="text-gray-400 text-sm my-5 max-w-[500px]">
              {lyrics_footer}
            </p>

            <p className="text-gray-400 text-sm mb-10">
              <span className="flex flex-row items-center">
                <BiCopyright className="mr-1" />{' '}
                {` ${year_released} ${song_label}`}
              </span>
            </p>
          </div>
        </div>

        <div className="w-[600px] flex justify-center items-center xl:items-start text-white">
          {data?.sections[2]?.type === 'VIDEO' && (
            <iframe
              src={`https://www.youtube.com/embed/${youtube_id}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              className="h-[300px] w-screen xl:w-full rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default SongDetails;
