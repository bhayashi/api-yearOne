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

export interface MovieLikes {
  id: number;
  imdbid: string;
  title: string;
  likes: number;
  dislikes: number;
}

export interface DBResult {
  rowCount: number;
  rows: Array<MovieLikes>;
}
