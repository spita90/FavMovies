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
  favMovies: Movie[];
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
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

export type MovieDetail = Movie & {
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path?: string;
    backdrop_path?: string;
  };
  budget?: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage?: string;
  imdb_id?: string;
  production_companies?: [
    {
      id: number;
      logo_path?: string;
      name: string;
      origin_country?: string;
    }
  ];
  production_countries?: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  revenue?: number;
  runtime?: number;
  spoken_languages?: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline?: string;
};
