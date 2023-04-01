import { combineReducers, configureStore } from "@reduxjs/toolkit";

import apiInstance from "./api/createApiInstance";
import modal from "./modal";

const rootReducer = combineReducers({
  [apiInstance.reducerPath]: apiInstance.reducer,
  modal,
});

const reducer = (state, action) => rootReducer(state, action);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiInstance.middleware),
});
