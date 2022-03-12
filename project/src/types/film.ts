export type FilmInfo = {
  id: number;
  poster: string;
  previewImage: string;
  backgroundImage: string;
  title: string;
  genre: string;
  releaseYear: number;
  description: string;
  rating: number;
  ratingDesc: string;
  voitingNum: number;
  director: string;
  castList: string;
  duration: number;
  videoDuration: string;
  video: string;
}

export type FilmsInfo =  FilmInfo[];
