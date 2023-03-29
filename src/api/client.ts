import axios, { AxiosInstance, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

const tmdbApiBaseUrl = "https://api.themoviedb.org/3";

let _tmdbApiClient: AxiosInstance;

/**
 * The TMDB API client
 */
export const getTMDBClient = () => {
  if (!_tmdbApiClient) {
    _tmdbApiClient = axios.create({
      baseURL: tmdbApiBaseUrl,
    });

    _tmdbApiClient.interceptors.request.use(async (request) => {
      // do something if needed (e.g. log)
      return request;
    });

    _tmdbApiClient.interceptors.response.use(
      async (response) => {
        // do something if needed (e.g. log)
        return response;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );

    // Manages requests retry, useful when connection condition is poor
    axiosRetry(_tmdbApiClient, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
    });
  }
  return _tmdbApiClient;
};

export const noResponse = (response: AxiosResponse) => {
  return response === undefined || response.data === undefined;
};
