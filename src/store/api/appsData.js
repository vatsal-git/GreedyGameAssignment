import createApiInstance from "./createApiInstance";

export const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAppsData: builder.query({
      query: () => "/apps",
    }),
  }),
  overrideExisting: false,
});

export const { useGetAppsDataQuery } = extendedApi;
