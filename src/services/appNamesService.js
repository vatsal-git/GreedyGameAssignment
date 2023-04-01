import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appNamesApi = createApi({
  reducerPath: "appNamesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://go-dev.greedygame.com/v3/dummy/",
  }),
  endpoints: (builder) => ({
    getAppNames: builder.query({
      query: () => "apps",
    }),
  }),
});

export const { useGetAppNamesQuery } = appNamesApi;
