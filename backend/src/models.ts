export type SummonerDTO = {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export type AccountDTO = {
  puuid: string;
  gameName: string;
  tagLine: string;
}