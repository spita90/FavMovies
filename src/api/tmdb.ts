import axios, { AxiosError } from "axios";
import { config } from "../config";
import {
  DomainError,
  GetTopRatedResponse as GetTopRatedMoviesResponse,
} from "../types";
import { getTMDBClient, noResponse } from "./client";

const TMDB_API_KEY = config.tmdbApiKey;

/**
 * Returns the top rated movies
 * @param page the list page
 */
export const getTopRatedMovies = async (
  page: number
): Promise<GetTopRatedMoviesResponse> =>
  getTMDBClient()
    .get<GetTopRatedMoviesResponse>(`movie/top_rated`, {
      params: {
        api_key: TMDB_API_KEY,
        page: page,
      },
    })
    .then((response) => {
      if (noResponse(response)) {
        throw new DomainError("errors.cannotGetTopRatedMovies");
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
