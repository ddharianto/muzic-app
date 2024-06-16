import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Error, Loader } from '../components';
import PlayPause from '../components/PlayPause';

import { BsExplicitFill } from 'react-icons/bs';
import { BiCopyright } from 'react-icons/bi';

import {
  song_details as data, //mock data to reduce api calls
  apple_music,
  artist_details as artistData,
} from '../assets';

import { setActiveSong, playPause } from '../redux/features/musicPlayerSlice';
// import { useGetSongDetailsQuery, useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const artistDetails = (adamid) => {
  // const {
  //   data: artistData,
  //   isFetching,
  //   error,
  // } = useGetArtistDetailsQuery(adamid);

  // if (isFetching) return <Loader />;
  // if (error) return <Error />;

  return artistData?.data[0]?.attributes?.url || '/pagenotfound';
};

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // const { data, isFetching, error } = useGetSongDetailsQuery(songid);

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

  // if (isFetching) return <Loader />;

  // if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col flex-wrap">
      <div className="relative flex flex-col mt-1">
        <div
          className={
            'xl:h-[600px] h-[300px] w-full bg-cover bg-no-repeat xl:bg-top bg-center rounded-md'
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
            <p className="flex flex-row justify-center items-center font-bold sm:text-2xl text-xl text-primary">
              {song_title}
              {data?.hub?.explicit && (
                <BsExplicitFill className="w-5 h-5 ml-2 mt-1 text-secondary-400" />
              )}
            </p>
            <Link to={artistDetails(artist_id)} target="_blank">
              <p className="text-xl text-primary mt-2 cursor-pointer hover:underline">
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

      <div className="flex flex-col xl:flex-row justify-between">
        <div className="w-full bg-secondary-200/50 rounded-md p-2 mt-1">
          <div className="mt-5 ml-5">
            <h2 className="text-primary text-3xl font-bold mb-2">Lyrics:</h2>
            {data?.sections[1]?.type === 'LYRICS' ? (
              data?.sections[1]?.text.map((line, i) => (
                <>
                  <p
                    key={`lyrics-${line}-${i}`}
                    className="text-white text-[15px] my-2 "
                  >
                    <span className="bg-primary py-1 px-3">
                      {line !== '' ? line : '~'}
                    </span>
                  </p>
                </>
              ))
            ) : (
              <p className="text-white text-xl font-bold my-1 ">
                <span className="bg-primary py-1 px-3">
                  Sorry, No lyrics found.
                </span>
              </p>
            )}

            <p className="text-white text-sm my-5 max-w-[500px]">
              {lyrics_footer}
            </p>

            <p className="text-white text-sm my-5">
              <span className="flex flex-row items-center">
                <BiCopyright className="mr-1" />{' '}
                {` ${year_released} ${song_label}`}
              </span>
            </p>
          </div>
        </div>

        <div
          className={`w-full md:min-w-[500px] ${
            data?.sections[2]?.type === 'VIDEO' ? 'h-[400px]' : 'md:min-h-full'
          } flex xl:items-start justify-center items-center bg-secondary-200/50 rounded-md lg:ml-1 mt-1`}
        >
          {data?.sections[2]?.type === 'VIDEO' ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtube_id}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              className="h-[400px] w-full rounded-md"
            />
          ) : (
            <p className="text-white text-xl font-bold m-5 mt-16">
              <span className="bg-primary py-1 px-3">
                Sorry, No videos found.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default SongDetails;
