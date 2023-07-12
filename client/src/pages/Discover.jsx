import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import { SongCard } from '../components';
import { RiArrowRightSLine } from 'react-icons/ri';

import { worldwide_chart, indonesia_chart } from '../assets'; // mock data to reduce api calls

// import {
//   useGetWorldwideChartQuery,
//   useGetCountryChartQuery,
// } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';

import 'swiper/css';
import 'swiper/css/free-mode';

const Discover = ({ country_chart }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // const {
  //   data: data_charts,
  //   isFetching: isFetching_charts,
  //   error: error_charts,
  // } = useGetWorldwideChartQuery();

  // const {
  //   data: data_countryCharts,
  //   isFetching: isFetching_countryCharts,
  //   error: error_countryCharts,
  // } = useGetCountryChartQuery(country_chart?.listid);

  const country_chart_name = country_chart?.name;

  // const top_countryChart = data_countryCharts?.tracks;
  const top_countryChart = indonesia_chart?.tracks;
  const top_countryChart_sliced = top_countryChart?.slice(0, 12);

  // console.log(top_countryChart_sliced);

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

  // const top_charts = data_charts?.tracks;
  const top_charts = worldwide_chart?.tracks;
  const top_charts_sliced = top_charts?.slice(0, 12);

  // Filtered artists
  const top_artists = top_charts
    ?.filter((el, i) => {
      const adamid = el.artists[0].adamid;
      return (
        i ===
        top_charts.findIndex((el2) => {
          return el2.artists[0].adamid === adamid;
        })
      );
    })
    ?.slice(0, 10);

  // if (top_artists) return <Loader />;

  // if (error_charts || error_countryCharts) return <Error />;

  return (
    <div className="flex flex-col flex-wrap">
      <div className="w-full flex justify-between items-end flex-row mt-4 mb-10">
        <h2 className="font-bold text-xl lg:text-3xl text-white text-left">
          Worldwide Top Chart
        </h2>
        <Link
          to={'/top-charts'}
          className="flex flex-row text-md font-medium text-gray-400 hover:text-cyan-400"
          onClick={() => dispatch(selectGenreListId('genre-global-chart-12'))}
        >
          View all <RiArrowRightSLine className="w-6 h-6" />
        </Link>
      </div>

      <div className="flex flex-nowrap md:flex-wrap justify-start gap-8">
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

      <div className="w-full flex justify-between items-end flex-row mt-10 mb-10">
        <h2 className="font-bold text-xl lg:text-3xl text-white text-left">
          Featured Artists
        </h2>
      </div>

      <div className=" w-full flex flex-col">
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
          {top_artists?.map((artist) => (
            <SwiperSlide
              key={artist?.key}
              style={{ width: '10%', height: 'auto' }}
              className="flex flex-col items-center text-center text-white rounded-full animate-slideright hover:underline"
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
          ))}
        </Swiper>
      </div>

      <div className="w-full flex justify-between items-end flex-row mt-10 mb-10">
        <h2 className="font-bold text-xl lg:text-3xl text-white text-left">
          {`${country_chart_name} Top Chart`}
        </h2>
        <Link
          to={'/top-charts'}
          className="flex flex-row text-md font-medium text-gray-400 hover:text-cyan-400"
          onClick={() => dispatch(selectGenreListId(country_chart.listid))}
        >
          View all <RiArrowRightSLine className="w-6 h-6" />
        </Link>
      </div>

      <div className="flex flex-nowrap md:flex-wrap justify-start gap-8">
        {top_countryChart_sliced?.map((song, i) => (
          <SongCard
            key={song?.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={top_countryChart_sliced}
            i={i}
          />
        ))}
      </div>

      <div className="w-full flex justify-between items-end flex-row mt-10 mb-10">
        <h2 className="font-bold text-xl lg:text-3xl text-white text-left">
          Featured Artists
        </h2>
      </div>

      <div className=" w-full flex flex-col">
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
          {top_artists_country?.map((artist) => (
            <SwiperSlide
              key={artist?.key}
              style={{ width: '10%', height: 'auto' }}
              className="flex flex-col items-center text-center text-white rounded-full animate-slideright hover:underline"
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
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Discover;
