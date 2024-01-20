import { useEffect, useState } from 'react';
import './App.css';
import { getAccountPuuid, getMatchDetails, getMatchIds } from './services';

type CalendarDictionary = Record<string, number>

function App() {
  const [summonerName, setSummonerName] = useState('imthedamage');
  const [summonerPuuid, setSummonerPuuid] = useState('');
  const [calendarArray, setCalendarArray] = useState<[string, number][]>([]);

  const getPuuid = async (userName: string) => {
    const acctData = await getAccountPuuid(userName);
    if (acctData.puuid) setSummonerPuuid(acctData.puuid);
  }

  const getMatchCalendarData = async (puuid: string) => {
    const matchIds = await getMatchIds(puuid);
    const calendarData: CalendarDictionary = {};
    await Promise.all(matchIds.map(async matchId => {
      const { info } = await getMatchDetails(matchId);
      const date = new Date(info.gameCreation).toLocaleDateString();
      const time = Math.ceil(info.gameDuration / 60);
      if (!calendarData[date]) calendarData[date] = time;
      else calendarData[date] += time;
    }));
    setCalendarArray(Object.entries(calendarData));
  }

  useEffect(() => {
    if (summonerPuuid) getMatchCalendarData(summonerPuuid);
  }, [summonerPuuid]);

  return (
    <div className="App">
      <p>Enter summoner name:</p>
      <input value={summonerName} onChange={({ target }) => setSummonerName(target.value)} />
      <button onClick={() => getPuuid(summonerName)}>Go</button>
      {calendarArray.length > 0 && calendarArray.map(date => (
        <div key={Math.random()}>
          <p>{date[0]}: {date[1]} minutes</p>
        </div>
      ))}
    </div>
  );
}

export default App;
