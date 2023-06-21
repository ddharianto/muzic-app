import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import {
  useGetGenresQuery,
  useShazamGetTopChartsQuery,
} from '../redux/services/shazamCore';

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: data_genres,
    isFetching: isFetching_genres,
    error: error_genres,
  } = useGetGenresQuery();
  const {
    data: data_topCharts,
    isFetching: isFetching_topCharts,
    error: error_topCharts,
  } = useShazamGetTopChartsQuery(genreListId || 'genre-global-chart-12');

  if (isFetching_genres || isFetching_topCharts)
    return <Loader title="Loading songs..." />;

  if (error_genres || error_topCharts) return <Error />;

  const countries = data_genres?.countries;
  const genres = data_genres?.global?.genres;
  console.log(data_topCharts.tracks);
  // console.log(genres);
  const title = genres.find((genre) => genre.listid === genreListId)?.name;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {title || 'Worldwide'}
        </h2>

        <select
          onChange={(e) => {
            return dispatch(selectGenreListId(e.target.value));
          }}
          value={genreListId || 'genre-global-chart-12'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.name} value={genre.listid}>
              {genre.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => {
            return dispatch(selectGenreListId(e.target.value));
          }}
          value={genreListId || 'genre-global-chart-12'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {countries.map((country) => (
            <option key={country.name} value={country.listid}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {data_topCharts?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data_topCharts?.tracks}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
