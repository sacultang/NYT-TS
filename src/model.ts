export interface News {
  abstract: string;
  web_url: string;
  multimedia: any[];
  headline: { main: string };
  _id: string;
  uri: string;
  pub_date: string;
}
type url = { url: string };
export interface HistoryType {
  id: number;
  text: string;
}

export interface addAction {
  News: News[];
}
