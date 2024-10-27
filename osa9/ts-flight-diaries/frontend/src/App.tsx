import { useState, useEffect } from 'react'
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from '../../backend/src/types';
import diaryService from '../../backend/src/services/diaryService';

function App() {
  const [date, setDate] = useState('2024-10-27');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [comment, setComment] = useState('No comment');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    setDiaries(diaryService.getEntries());
  }, [])

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    // console.log(diaryToAdd);

    await diaryService.addDiary(diaryToAdd);
    // const result = await diaryService.addDiary(diaryToAdd);
    // setDiaries([...diaries, result]);
    setDate("");
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Good);
    setComment("");
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          <label>Date: </label>
          <input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Visibility: </label>
          <input value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility)} />
        </div>
        <div>
          <label>Weather: </label>
          <input value={weather} onChange={(e) => setWeather(e.target.value as Weather)} />
        </div>
        <div>
          <label>Comment: </label>
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>

      <h2>Diary entries</h2>
      <ul>
        {diaries.map(diary => (
          <li key={diary.id}>
            <h3>{diary.date}</h3> 
            visibility: {diary.weather} <br/>
            weather: {diary.visibility} <br/>
            comment: {diary.comment}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
