export interface News {
  abstract: string;
  web_url: string;
  multimedia: MultiMedia[];
  headline: { main: string };
  _id: string;
  uri: string;
}
interface MultiMedia {
  rank: number;
  url: string;
  type: string;
}
