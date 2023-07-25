import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        process.env.REACT_APP_SHAZAM_CORE_RAPID_API_KEY_2
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getArtistDetails: builder.query({
      query: (artistid) => `/artists/get-details?id=${artistid}&l=en-US`,
    }),
    getSongDetails: builder.query({
      query: (songid) => `/songs/get-details?key=${songid}&locale=en-US`,
    }),
    getTopChart: builder.query({
      query: (track) =>
        `/charts/track?locale=en-US&listId=${track}&pageSize=20&startFrom=0`,
    }),
    getWorldwideChart: builder.query({
      query: () =>
        `/charts/track?locale=en-US&listId=genre-global-chart-12&pageSize=20&startFrom=0`,
    }),
    getLists: builder.query({
      query: () => `/charts/list`,
    }),
  }),
});

export const {
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetWorldwideChartQuery,
  useGetTopChartQuery,
  useGetListsQuery,
} = shazamApi;
