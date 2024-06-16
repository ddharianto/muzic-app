import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/musicPlayerSlice';
import { useGetTopChartQuery } from '../redux/services/shazamCore';

import { worldwideChart, countryCharts } from '../assets'; // mock data to reduce api calls

const TopChart = ({ data, countries }) => {
  const dispatch = useDispatch();
  const { genreListId, activeSong, isPlaying } = useSelector(
    (state) => state.player
  );
  const [title, setTitle] = useState('');

  useEffect(() => {
    const titleName =
      data?.global?.genres?.find((el) => el.listid === genreListId) ||
      countries?.find((el) => el.listid === genreListId);
    setTitle(titleName?.name);
    // eslint-disable-next-line
  }, [genreListId]);

  const topChart =
    genreListId === 'genre-global-chart-12' ? worldwideChart : countryCharts;

  // const {
  //   data: data_topCharts,
  //   isFetching: isFetching_topCharts,
  //   error: error_topCharts,
  // } = useGetTopChartQuery(genreListId);

  const genres = data?.global?.genres;

  // asc sorting
  const genresSorted = [...genres].sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );

  const countriesSorted = [...countries].sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );

  const handleClick = (el) => {
    dispatch(selectGenreListId(el.listid));
  };

  if (isFetching_topCharts) return <Loader />;

  if (error_topCharts) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="bg-secondary-200/30 rounded-md p-2 mt-1">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col my-2">
          <h2 className="font-bold text-3xl text-primary text-left">
            Top Chart {title}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {topChart?.tracks?.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={topChart?.tracks}
              i={i}
            />
          ))}
        </div>
      </div>

      <div className="bg-secondary-200/30 rounded-md p-2 mt-1">
        <div className="w-full flex justify-between items-end flex-row my-1">
          <h2 className="font-bold text-xl lg:text-3xl text-primary text-left">
            Other Charts
          </h2>
        </div>

        <div className="flex flex-none flex-row flex-wrap">
          <div className="relative flex justify-center items-center px-2 py-1 m-1 min-w-[20px] bg-inherit text-primary">
            <span>By genre:</span>
          </div>
          {genresSorted.map((genre) => (
            <div
              key={genre.id}
              className={`relative flex justify-center items-center px-2 py-1 m-1 min-w-[20px] text-white ${
                genreListId === genre.listid ? 'bg-primary' : 'bg-primary/50'
              }  backdrop-blur-sm animate-slideup rounded cursor-pointer hover:ring-2 ring-secondary-400`}
              onClick={() => {
                handleClick(genre);
                setTitle(genre.name);
              }}
            >
              <span>{genre.name}</span>
            </div>
          ))}
          <div className="relative flex justify-center items-center px-2 py-1 m-1 min-w-[20px] bg-inherit text-primary">
            <span>By country:</span>
          </div>
          {countriesSorted.map((country) => (
            <div
              key={country.id}
              className={`relative flex justify-center items-center px-2 py-1 m-1 min-w-[20px] text-white ${
                genreListId === country.listid ? 'bg-primary' : 'bg-primary/50'
              } backdrop-blur-sm animate-slideup rounded cursor-pointer hover:ring-2 ring-secondary-400`}
              onClick={() => {
                handleClick(country);
                setTitle(country.name);
              }}
            >
              <span>{country.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopChart;
