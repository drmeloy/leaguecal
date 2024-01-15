import { useEffect, useState } from 'react';
import './App.css';
import { MatchData, getAccountPuuid, getDetails, getMatches } from './services/services';

function App() {
  const [summonerName, setSummonerName] = useState('');
  const [puuid, setPuuid] = useState('');
  const [matchHistory, setMatchHistory] = useState<string[]>([]);
  const [matchData, setMatchData] = useState<MatchData>();
  const [matchLength, setMatchLength] = useState('');
  const [matchDate, setMatchDate] = useState('');

  const getPuuid = async (userName: string) => {
    const acctData = await getAccountPuuid(userName);
    if (acctData.puuid) setPuuid(acctData.puuid);
  }

  const getMatchHistory = async (id: string) => {
    const matches = await getMatches(id);
    if (matches.length) setMatchHistory(matches)
  }

  const getMatchDetails = async (matchId: string) => {
    const details = await getDetails(matchId);
    console.log(details)
    if (details) setMatchData(details)
  }

  useEffect(() => {
    if (puuid) getMatchHistory(puuid);
  }, [puuid]);

  useEffect(() => {
    if (matchData) {
      const date = new Date(matchData.info.gameCreation);
      setMatchDate(date.toDateString());
      const time = Math.ceil(matchData.info.gameDuration / 60);
      setMatchLength(`${time} minutes`);
    }
  }, [matchData])

  return (
    <div className="App">
      <p>Enter summoner name:</p>
      <input value={summonerName} onChange={({ target }) => setSummonerName(target.value)} />
      <button onClick={() => getPuuid(summonerName)}>Go</button>
      {puuid && <p>Puuid: {puuid}</p>}
      {matchHistory.length > 0 && <div>Matches: {matchHistory.map(match => <div key={match} onClick={() => getMatchDetails(match)}>{match}</div>)}</div>}
      {matchDate && <p>Match date: {matchDate}</p>}
      {matchLength && <p>Match length: {matchLength}</p>}
    </div>
  );
}

export default App;
