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
    if (matchIds.length) {
      const calendarData = Object.entries(await matchIds.reduce((acc, curr) => {
        getMatchDetails(curr).then(({ info }) => {
          const date = new Date(info.gameCreation).toLocaleDateString();
          const time = Math.ceil(info.gameDuration / 60);
          if (!acc[date]) acc[date] = time;
          else acc[date] += time;
        })
        return acc;
      }, {} as CalendarDictionary));
      console.log('Calendar data: ', calendarData)
      // setCalendarArray(Object.entries(calendarData));
    }
  }

  useEffect(() => {
    if (summonerPuuid) getMatchCalendarData(summonerPuuid);
  }, [summonerPuuid]);

  useEffect(() => {
    console.log('Calendar array: ', calendarArray)
  }, [calendarArray.length])

  return (
    <div className="App">
      <p>Enter summoner name:</p>
      <input value={summonerName} onChange={({ target }) => setSummonerName(target.value)} />
      <button onClick={() => getPuuid(summonerName)}>Go</button>
      {summonerPuuid && <p>Summoner Puuid: {summonerPuuid}</p>}
      {calendarArray.length > 0 && calendarArray.map(date => (
        <div>
          <p>{date[0]}: {date[1]} minutes</p>
        </div>
      ))}
    </div>
  );
}

export default App;
