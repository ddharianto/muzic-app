import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Topbar, Sidebar, MusicPlayer, Loader, Footer } from './components';
import {
  ArtistDetails,
  Discover,
  Search,
  SongDetails,
  TopCharts,
  PageNotFound,
  Login,
} from './pages';

// import { data } from './assets'; //mock data to reduce api calls

import { useGetListsQuery } from './redux/services/shazamCore';
import { selectGenreListId } from './redux/features/musicPlayerSlice';

const App = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState('US');
  const [loading, setLoading] = useState(true);
  const { activeSong } = useSelector((state) => state.player);

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_GEO_API_KEY}`
      )
      .then((res) => setCountry(res?.data?.location.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    // eslint-disable-next-line
  }, []);

  const { data, isFetching } = useGetListsQuery();

  const countries = data?.countries;
  const country_id = countries?.find((el) => el.id === country);

  useEffect(() => {
    dispatch(selectGenreListId(country_id?.listid));

    // eslint-disable-next-line
  }, [country_id]);

  if (loading || isFetching) return <Loader />;

  return (
    <div className="relative flex w-screen sm:max-w-[1920px] mx-auto">
      <Sidebar />
      <div className="flex-1 flex flex-col justify-between h-screen bg-gradient-to-b px-1 from-white from-70% to-secondary-400">
        <div className="h-16">
          <Topbar />
        </div>

        <div className="flex flex-col h-[calc(100vh-64px)] overflow-y-scroll hide-scrollbar">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Discover country_id={country_id} />} />
              <Route
                path="/top-charts"
                element={<TopCharts countries={countries} data={data} />}
              />
              <Route path="/artists/:artistid" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/logout" element={<Search />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
          <div className="w-full mt-1 bg-white/40 text-white rounded-t-md">
            <Footer />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute md:h-80 md:w-[350px] bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
