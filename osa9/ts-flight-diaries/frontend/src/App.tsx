import { useState, useEffect } from 'react'
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from '../../backend/src/types';
import diaryService from '../../backend/src/services/diaryService';

function App() {
  const [date, setDate] = useState('2024-10-27');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [comment, setComment] = useState('No comment');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setDiaries(diaryService.getEntries());
  }, [])

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if(!date) {
      setError("Error: Date is required.");
      return;
    }

    const diaryToAdd: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    // console.log(diaryToAdd);

    try {
      await diaryService.addDiary(diaryToAdd);
      setDate("");
      setWeather(Weather.Sunny);
      setVisibility(Visibility.Good);
      setComment("");
      setError("");
    } catch(error) {
      let errorMessage = "Something went wrong.";
      if(error instanceof Error) {
        errorMessage += error.message;
      }
      setError(errorMessage);
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>

      {error && <p style={{color: 'red'}}>{error}</p>}

      <form onSubmit={diaryCreation}>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Visibility: </label>
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          <label>Weather: </label>
          {Object.values(Weather).map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          <label>Comment: </label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>

      <h2>Diary entries</h2>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <h3>{diary.date}</h3>
            visibility: {diary.visibility} <br />
            weather: {diary.weather} <br />
            comment: {diary.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
