import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        process.env.REACT_APP_SHAZAM_CORE_RAPID_API_KEY
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopChart: builder.query({
      query: (track) =>
        `/charts/track?locale=en-US&listId=${track}&pageSize=20&startFrom=0`,
    }),
    getCountryChart: builder.query({
      query: (track) =>
        `/charts/track?locale=en-US&listId=${track}&pageSize=20&startFrom=0`,
    }),
    getWorldwideChart: builder.query({
      query: (track) =>
        `/charts/track?locale=en-US&listId=genre-global-chart-12&pageSize=20&startFrom=0`,
    }),
    getLists: builder.query({
      query: () => `/charts/list`,
    }),
  }),
});

export const {
  useGetTopChartQuery,
  useGetWorldwideChartQuery,
  useGetCountryChartQuery,
  useGetListsQuery,
} = shazamApi;
