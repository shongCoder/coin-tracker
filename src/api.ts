export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const BASE_URL = `https://api.coinpaprika.com/v1`;
const NICO_URL = `https://ohlcv-api.nomadcoders.workers.dev/?coinId=`;

export async function fetchCoins() {
  const coins: ICoin[] = await fetch(`${BASE_URL}/coins`).then((response) =>
    response.json()
  );
  return coins.slice(0, 100);
}

export async function fetchCoinInfo(coinId: string) {
  const info = await fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
  return info;
}

export async function fetchCoinTickers(coinId: string) {
  const info = await fetch(`${NICO_URL}${coinId}`).then((response) =>
    response.json()
  );
  return info[0];
}

export async function fetchCoinHistory(coinId: string) {
  const info = await fetch(`${NICO_URL}${coinId}`).then((response) =>
    response.json()
  );
  return info;
}
