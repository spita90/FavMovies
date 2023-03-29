/**
 * A custom Error class
 * @param messageLocaleKey the key string for the i18n translatable message
 * @param fatal if true, local data will be erased
 */
export class DomainError extends Error {
  constructor(messageLocaleKey: string, fatal: boolean = false) {
    super(messageLocaleKey);
    this.name = "DomainError";
    this.stack = messageLocaleKey;
    this.fatal = fatal;
  }
  fatal: boolean;
}

export type User = {
  firstUse: boolean;
  favMoviesIds: string[];
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type GetTopRatedResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
