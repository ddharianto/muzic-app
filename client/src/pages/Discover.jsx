import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import { Error, Loader, SongCard } from '../components';
import { RiArrowRightSLine } from 'react-icons/ri';

// import { selectGenreListId } from '../redux/features/playerSlice';
import { useShazamGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const Discover = () => {
  // const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: data_topCharts,
    isFetching: isFetching_topCharts,
    error: error_topCharts,
  } = useShazamGetTopChartsQuery(genreListId || 'genre-global-chart-12');

  if (isFetching_topCharts) return <Loader title="Loading songs..." />;

  if (error_topCharts) return <Error />;

  // const countries = data_genres?.countries;
  // const genres = data_genres?.global?.genres;
  const top_charts = data_topCharts?.tracks;

  // Remove duplicate artists
  const top_artists = top_charts?.filter((el, i) => {
    const adamid = el.artists[0].adamid;
    return (
      i ===
      top_charts.findIndex((el2) => {
        return el2.artists[0].adamid === adamid;
      })
    );
  });

  // const title = genres.find((genre) => genre.listid === genreListId)?.name;

  return (
    <div className="flex flex-col flex-wrap">
      <div className="w-full flex justify-between items-end flex-row mt-4 mb-10">
        <h2 className="font-bold text-xl lg:text-3xl text-white text-left">
          Worldwide Top Chart
        </h2>
        <Link
          to={'/top-charts'}
          className="flex flex-row text-md font-medium text-gray-400 hover:text-cyan-400"
        >
          View all <RiArrowRightSLine className="w-6 h-6" />
        </Link>
      </div>

      <div className="flex flex-nowrap md:flex-wrap justify-start gap-8">
        {top_charts?.slice(0, 10).map((song, i) => (
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
          {top_artists?.slice(0, 10).map((artist) => (
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
