import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { UserDataResponse, getAccountPuuid } from './services/services';

function App() {
  const [summonerName, setSummonerName] = useState('');
  const [puuid, setPuuid] = useState('');
  const [matchHistory, setMatchHistory] = useState([]);

  const getPuuid = async (userName: string) => {
    const acctData = await getAccountPuuid(userName);
    if (acctData.puuid) setPuuid(acctData.puuid);
  }

  return (
    <div className="App">
      <p>Enter summoner name:</p>
      <input value={summonerName} onChange={({ target }) => setSummonerName(target.value)} />
      <button onClick={() => getPuuid(summonerName)}>Go</button>
      {puuid && <p>Puuid: {puuid}</p>}
    </div>
  );
}

export default App;
