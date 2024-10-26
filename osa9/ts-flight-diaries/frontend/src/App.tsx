import { useState, useEffect } from 'react'
import axios from 'axios';

interface Diary {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment?: string,
}

function App() {
  // const [newDiary, setNewDiary] = useState('');
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then((response) => {
      setDiaries(response.data);
    })
  })

  return (
    <div>
      <h1>Diary entries</h1>
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
