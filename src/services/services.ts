import axios from "axios";

const baseUrl = 'https://na1.api.riotgames.com/lol'
const authToken = 'RGAPI-2248c6cf-34e9-4752-b196-c5b7b27917c2';

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

export const getAccountPuuid = (summonerName: string): Promise<UserDataResponse> => axios.get(`${baseUrl}/summoner/v4/summoners/by-name/${summonerName}?api_key=${authToken}`)
.then(res => res.data)
.catch(err => console.log('Err in getAccountPuuid: ', err))
;

export const getMatches = (puuid: string): Promise<string[]> => axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${authToken}`)
.then(res => res.data)
.catch(err => console.log('Err in getMatches: ', err))

export const getDetails = (matchId: string): Promise<MatchData> => axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${authToken}`)
.then(res => res.data)
.catch(err => console.log('Err in getDetails: ', err))