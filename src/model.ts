export interface News {
  abstract: string;
  web_url: string;
  multimedia: MultiMedia[];
  headline: { main: string };
}
interface MultiMedia {
  rank: number;
  url: string;
  type: string;
}
