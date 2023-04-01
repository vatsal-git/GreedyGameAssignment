import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analyticsTableDataApi = createApi({
  reducerPath: "analyticsTableDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://go-dev.greedygame.com/v3/dummy/",
  }),
  endpoints: (builder) => ({
    getAnalyticsTableData: builder.query({
      query: ({ startDate, endDate }) =>
        `report?startDate=${startDate}&endDate=${endDate}`,
    }),
  }),
});

export const { useGetAnalyticsTableDataQuery } = analyticsTableDataApi;
