import createApiInstance from "./createApiInstance";

export const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAppNames: builder.query({
      query: () => "/apps",
    }),
  }),
  overrideExisting: false,
});

export const { useGetAppNamesQuery } = extendedApi;
