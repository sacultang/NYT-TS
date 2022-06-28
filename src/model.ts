export interface News {
  abstract: string;
  web_url: string;
  multimedia: Multimedia[];
  headline: { main: string };
  _id: string;
  uri: string;
  pub_date: string;
}
export interface Multimedia {
  url: string;
}
type url = { url: string };

export interface HistoryType {
  id: number;
  text: string;
}

export type newInterface = Omit<News, "multimedia"> & { url: string };

export interface NewsItem {
  abstract: string;
  web_url: string;
  url: string;
  headline: { main: string };
  _id: string;
  uri: string;
  pub_date: string;
}
