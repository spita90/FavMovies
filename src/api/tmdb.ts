import axios, { AxiosError } from "axios";
import { config } from "../config";
import {
  DomainError,
  GetTopRatedResponse as GetTopRatedMoviesResponse,
  MovieDetail,
} from "../types";
import { getTMDBClient, noResponse } from "./client";

const TMDB_API_KEY = config.tmdbApiKey;

/**
 * Returns the top rated movies
 * @param language the language in which to obtain the results
 * @param page the list page
 */
export const getTopRatedMovies = async (
  language: string,
  page: number
): Promise<GetTopRatedMoviesResponse> =>
  getTMDBClient()
    .get<GetTopRatedMoviesResponse>(`movie/top_rated`, {
      params: {
        api_key: TMDB_API_KEY,
        language: language,
        page: page,
      },
    })
    .then((response) => {
      if (noResponse(response)) {
        throw new DomainError("errors.cannotGetTopRatedMovies");
      }
      return response.data;
    });

/**
 * Returns details about specified movie
 * @param language the language in which to obtain the movie details
 * @param movieId the movie id
 *
 */
export const getMovieDetails = async (
  language: string,
  movieId: number
): Promise<MovieDetail> =>
  getTMDBClient()
    .get<MovieDetail>(`movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: language,
      },
    })
    .then((response) => {
      if (noResponse(response)) {
        throw new DomainError("errors.cannotGetMovieDetails");
      }
      return response.data;
    });

// useful response/error validation methods
export const isError404NotFound = (e: any) => {
  return (
    axios.isAxiosError(e) &&
    e.code === AxiosError.ERR_BAD_REQUEST &&
    e.response &&
    e.response.status === 404
  );
};
