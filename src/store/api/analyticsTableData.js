import createApiInstance from "./createApiInstance";

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAnalyticsTableData: build.query({
      query: ({ startDate, endDate }) =>
        `/report?startDate=${startDate}&endDate=${endDate}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAnalyticsTableDataQuery } = extendedApi;
