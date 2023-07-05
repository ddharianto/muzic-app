import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Topbar, Sidebar, MusicPlayer, Loader, Footer } from './components';
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from './pages';

import { useGetListsQuery } from './redux/services/shazamCore';
import { selectGenreListId } from './redux/features/playerSlice';

const App = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
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
  }, []);

  const {
    data: data_lists,
    isFetching: isFetching_lists,
    error: error_lists,
  } = useGetListsQuery();

  const countries = data_lists?.countries;
  const country_chart = countries?.find((el) => el.id === country);

  useEffect(() => {
    dispatch(selectGenreListId(country_chart?.listid));
    // eslint-disable-next-line
  }, [country_chart]);

  if (loading || isFetching_lists || error_lists)
    return <Loader title="Loading Songs around you..." />;

  return (
    <div className="relative flex max-w-[1920px] mx-auto">
      <Sidebar login={login} setLogin={setLogin} />
      <div className="flex-1 flex flex-col justify-between h-screen bg-gradient-to-br from-black to-[#121286]">
        <Topbar login={login} setLogin={setLogin} />

        <div className="flex flex-col px-6 h-[calc(100vh-64px)] overflow-y-scroll hide-scrollbar">
          <div className="flex-1 ">
            <Routes>
              <Route
                path="/"
                element={<Discover country_chart={country_chart} />}
              />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route
                path="/top-charts"
                element={<TopCharts countries={countries} data={data_lists} />}
              />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
            <div className="w-full mt-10 bg-white/5 text-white">
              <Footer />
            </div>
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
