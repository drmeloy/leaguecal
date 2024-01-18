import axios from "axios";
import { MatchData, UserDataResponse } from "./types";

const BASE_NA_URL = "https://na1.api.riotgames.com/lol";
const BASE_AMERICAS_URL = "https://americas.api.riotgames.com/lol";
const authToken = process.env.REACT_APP_RIOT_KEY;



export const getAccountPuuid = (
  summonerName: string
): Promise<UserDataResponse> =>
  axios
    .get(
      `${BASE_NA_URL}/summoner/v4/summoners/by-name/${summonerName}?api_key=${authToken}`
    )
    .then((res) => res.data)
    .catch((err) => console.warn("Err in getAccountPuuid: ", err));

export const getMatchIds = (puuid: string): Promise<string[]> =>
  axios
    .get(
      `${BASE_AMERICAS_URL}/match/v5/matches/by-puuid/${puuid}/ids?api_key=${authToken}&count=3`
    )
    .then((res) => res.data)
    .catch((err) => console.warn("Err in getMatches: ", err));

export const getMatchDetails = (matchId: string): Promise<MatchData> =>
  axios
    .get(
      `${BASE_AMERICAS_URL}/match/v5/matches/${matchId}?api_key=${authToken}`
    )
    .then((res) => res.data)
    .catch((err) => console.warn("Err in getDetails: ", err));
