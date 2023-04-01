import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { analyticsTableDataApi } from "../services/analyticsTableDataService";
import { appNamesApi } from "./../services/appNamesService";

export const store = configureStore({
  reducer: {
    [analyticsTableDataApi.reducerPath]: analyticsTableDataApi.reducer,
    [appNamesApi.reducerPath]: appNamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(analyticsTableDataApi.middleware)
      .concat(appNamesApi.middleware),
});

setupListeners(store.dispatch);
