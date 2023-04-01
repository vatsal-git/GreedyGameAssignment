import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_QUERY } from "./../../config";

const baseQuery = () => fetchBaseQuery({ baseUrl: API_BASE_QUERY }); //implement headers for auth if needed

const createApiInstance = createApi({
  baseQuery: baseQuery(),
  endpoints: () => ({}), //inject endpoints separately
});

export default createApiInstance;
