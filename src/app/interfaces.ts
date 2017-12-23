export interface Show {
  id: number;
  name: string;
  nextEpisode?: object;
  image: {
    medium: string;
  };
}

export interface Episode {
  airdate: string;
  airstamp: string;
  name: string;
  season: number;
  number: number;
  url: string;
}

export interface ShowWithEpisodes {
  show: Show;
  episodes: Episode[];
}
