export interface CoinData {
  id: string;
  name: string;
  price: number;
  equivalentValue: string;
  date: string;
  key: string;
}
export interface LoginData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface TokenData {
  token: string;
}

export interface AuthData {
  id: string;
  username: string;
  lastVisit: string;
}

export interface CoinDataChart {
  labels: string[];
  data: number[];
}

export interface datasetArray {
  data: number[];
}

export interface CoinBarDataChart {
  labels: string[];
  datasets: Array<datasetArray>;
}

export type FormSubmitData = {
  username: string;
  password: string;
};
