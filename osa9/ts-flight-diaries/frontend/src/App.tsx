import { useState, useEffect } from 'react'
// import { Weather, Visibility } from '../../backend/src/types';
import axios from 'axios';

interface Diary {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment?: string,
}

function App() {
  const [newDiary, setNewDiary] = useState('');
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then((response) => {
      setDiaries(response.data);
    })
  })

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      date: '2024-10-26',
      weather: 'sunny',
      visibility: 'good',
      comment: 'this is a test'
    }

    setDiaries(diaries.concat(diaryToAdd));
    setNewDiary('');
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <input value={newDiary} onChange={(event) => setNewDiary(event.target.value)} />
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
