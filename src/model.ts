export interface News {
  abstract: string;
  web_url: string;
  multimedia: MultiMedia[];
  headline: { main: string };
  _id: string;
  uri: string;
  pub_date: string;
}
interface MultiMedia {
  rank: number;
  url: string;
  type: string;
}
export interface HistoryType {
  id: number;
  text: string;
}
