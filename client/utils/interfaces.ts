/* eslint-disable camelcase */
export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResultProps {
  data: MovieSearchResult;
}

export interface MovieDetails {
  Title: string;
  Director: string;
  Year: string;
  Plot: string;
  Poster: string;
}
