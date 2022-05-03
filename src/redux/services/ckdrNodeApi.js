// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_ENDPOINT
    : process.env.REACT_APP_DEVELOPMENT_ENDPOINT;
// const ApiKey = localStorage.getItem("token")

// Define a service using a base URL and expected endpoints
export const ckdrNodeApi = createApi({
  reducerPath: "ckdrnode",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: () => `/activities.json`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetActivitiesQuery } = ckdrNodeApi;
