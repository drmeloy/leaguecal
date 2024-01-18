export type UserDataResponse = {
  "id": string;
  "accountId": string;
  "puuid": string;
  "name": string;
  "profileIconId": number;
  "revisionDate": number;
  "summonerLevel": number;
}

export type MatchData = {
  info: {
    gameCreation: number;
    gameDuration: number;
    gameEndTimestamp?: number;
  }
}