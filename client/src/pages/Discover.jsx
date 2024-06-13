import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import { SongCard, Loader, Error } from '../components';
import { RiArrowRightSLine } from 'react-icons/ri';

// import { worldwideChart, countryCharts } from '../assets'; // mock data to reduce api calls

import {
  useGetWorldwideChartQuery,
  useGetTopChartQuery,
} from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/musicPlayerSlice';

import 'swiper/css';
import 'swiper/css/free-mode';

const Discover = ({ country_id }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: worldwideChart,
    isFetching: isFetching_worldwideCharts,
    error: error_charts,
  } = useGetWorldwideChartQuery();

  const {
    data: countryCharts,
    isFetching: isFetching_countryCharts,
    error: error_countryCharts,
  } = useGetTopChartQuery(country_id?.listid);

  const country_chart_name = country_id?.name;

  const top_countryChart = countryCharts?.tracks;
  const top_countryChart_sliced = top_countryChart?.slice(0, 12);

  // Filtered artists
  const top_artists_country = top_countryChart
    ?.filter((el, i) => {
      const adamid = el.artists[0].adamid;
      return (
        i ===
        top_countryChart.findIndex((el2) => {
          return el2.artists[0].adamid === adamid;
        })
      );
    })
    ?.slice(0, 10);

  const top_charts = worldwideChart?.tracks;
  const top_charts_sliced = top_charts?.slice(0, 12);

  if (isFetching_worldwideCharts || isFetching_countryCharts) return <Loader />;

  if (error_charts || error_countryCharts) return <Error />;

  return (
    <div className="flex flex-col flex-wrap">
      <div className="bg-secondary-200/30 rounded-md p-2 mt-1">
        <div className="w-full flex justify-between items-end flex-row">
          <h2 className="font-bold text-xl lg:text-3xl text-primary text-left my-1">
            Worldwide Top Chart
          </h2>
          <Link
            to={'/top-charts'}
            className="flex flex-row mb-2 text-md font-medium text-primary/70 hover:text-secondary-400"
            onClick={() => dispatch(selectGenreListId('genre-global-chart-12'))}
          >
            View all <RiArrowRightSLine className="w-6 h-6" />
          </Link>
        </div>

        <div className="flex flex-wrap lg:ml-8 md:flex-wrap justify-start gap-6 lg:gap-8">
          {top_charts_sliced.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={top_charts_sliced}
              i={i}
            />
          ))}
        </div>
      </div>

      <div className="bg-secondary-200/30 rounded-md p-2 mt-1">
        <div className="w-full flex justify-between items-end flex-row">
          <h2 className="font-bold text-xl lg:text-3xl text-primary text-left my-1">
            {`${country_chart_name} Top Chart`}
          </h2>
          <Link
            to={'/top-charts'}
            className="flex flex-row mb-2 text-md font-medium text-primary/70 hover:text-secondary-400"
            onClick={() => dispatch(selectGenreListId(country_id.listid))}
          >
            View all <RiArrowRightSLine className="w-6 h-6" />
          </Link>
        </div>

        <div className="flex flex-wrap lg:ml-8 md:flex-wrap justify-start gap-6 lg:gap-8">
          {/* {top_countryChart_sliced?.map((song, i) => (
            <SongCard
              key={song?.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={top_countryChart_sliced}
              i={i}
            />
          ))} */}
        </div>
      </div>

      <div className="bg-secondary-200/30 rounded-md p-2 mt-1">
        <div className="w-full flex justify-between items-end flex-row">
          <h2 className="font-bold text-xl lg:text-3xl text-primary text-left my-1">
            Featured Artists
          </h2>
        </div>

        <div className="w-full flex flex-col mb-5">
          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            observer={true}
            observeParents={true}
          >
            {/* {top_artists_country?.map((artist) => (
              <SwiperSlide
                key={artist?.key}
                style={{ width: '12%', height: 'auto' }}
                className="flex flex-col items-center text-center text-sm lg:text-[15px] text-primary font-bold rounded-full animate-slideright hover:underline"
              >
                <Link to={`/artists/${artist?.artists[0].adamid}`}>
                  <img
                    src={artist?.images?.background}
                    alt="Name"
                    className="rounded-full w-full object-cover"
                  />
                </Link>
                <Link to={`/artists/${artist?.artists[0].adamid}`}>
                  {artist.subtitle}
                </Link>
              </SwiperSlide>
            ))} */}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Discover;
