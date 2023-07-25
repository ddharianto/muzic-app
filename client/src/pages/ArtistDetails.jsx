import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';
import { Error, Loader } from '../components';

const ArtistDetails = () => {
  const { artistid } = useParams();

  const {
    data: artistData,
    isFetching,
    error,
  } = useGetArtistDetailsQuery(artistid);

  const artistUrl = artistData?.data[0]?.attributes?.url;

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  // redirecting to external link
  window.location.replace(artistUrl);

  return <Loader />;
};

export default ArtistDetails;
