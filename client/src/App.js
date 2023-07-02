import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Topbar, Sidebar, MusicPlayer, Loader } from './components';
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from './pages';

const App = () => {
  const [login, setLogin] = useState(false);
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong } = useSelector((state) => state.player);

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_pWayRhwsKrj5C47MqZbvBbiZz1YNF`
      )
      .then((res) => setCountry(res?.data?.location.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (loading) return <Loader title="Loading Songs around you..." />;

  return (
    <div className="relative flex max-w-[1920px] mx-auto">
      <Sidebar login={login} setLogin={setLogin} />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Topbar login={login} setLogin={setLogin} />

        <div className="px-6 h-[calc(100vh-64px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover country={country} />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route
                path="/top-charts"
                element={<TopCharts country={country} />}
              />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
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
