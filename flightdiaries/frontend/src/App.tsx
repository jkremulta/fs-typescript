import { useState, useEffect } from "react"
import axios from "axios"

interface Diary {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment?: string
}

interface FormData {
  date: string,
  visibility: string,
  weather: string,
  comment: string
}

function App() {
  const [diaryEntries, setDiaryEntries] = useState<Diary[]>([])
  const [formData, setFormData] = useState<FormData>({
    date: '',
    visibility: '',
    weather: '',
    comment: '',
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then((response) => setDiaryEntries(response.data))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage(null);

    axios.post<Diary>('http://localhost:3000/api/diaries', formData).then((response) => {
      setDiaryEntries((prev) => prev.concat(response.data))
      setFormData({ date: '', visibility: '', weather: '', comment: '' });
    })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          const messages = error.response.data.error
            .map((e: { message: string }) => e.message)
            .join(', ');
          setErrorMessage(messages);
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
      })
  }

  return (
    <div>
      <div>
        <h2>Add new entry</h2>
        {errorMessage &&
          <p style={{ color: 'red' }}>
            {errorMessage}
          </p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div>
            visibility
            <div>
              <input
                type="radio"
                id="great"
                name="visibility"
                value="great"
                checked={formData.visibility === 'great'}
                onChange={handleChange}
              />
              <label htmlFor="great">great</label>
            </div>
            <div>
              <input
                type="radio"
                id="good"
                name="visibility"
                value="good"
                checked={formData.visibility === 'good'}
                onChange={handleChange}
              />
              <label htmlFor="good">good</label>
            </div>
            <div>
              <input
                type="radio"
                id="ok"
                name="visibility"
                value="ok"
                checked={formData.visibility === 'ok'}
                onChange={handleChange}
              />
              <label htmlFor="ok">ok</label>
            </div>
            <div>
              <input
                type="radio"
                id="poor"
                name="visibility"
                value="poor"
                checked={formData.visibility === 'poor'}
                onChange={handleChange}
              />
              <label htmlFor="poor">poor</label>
            </div>
          </div>
          <div>
            weather
            <div>
              <input
                type="radio"
                id="sunny"
                name="weather"
                value="sunny"
                checked={formData.weather === 'sunny'}
                onChange={handleChange}
              />
              <label htmlFor="sunny">sunny</label>
            </div>
            <div>
              <input
                type="radio"
                id="rainy"
                name="weather"
                value="rainy"
                checked={formData.weather === 'rainy'}
                onChange={handleChange}
              />
              <label htmlFor="rainy">rainy</label>
            </div>
            <div>
              <input
                type="radio"
                id="cloudy"
                name="weather"
                value="cloudy"
                checked={formData.weather === 'cloudy'}
                onChange={handleChange}
              />
              <label htmlFor="cloudy">cloudy</label>
            </div>
            <div>
              <input
                type="radio"
                id="stormy"
                name="weather"
                value="stormy"
                checked={formData.weather === 'stormy'}
                onChange={handleChange}
              />
              <label htmlFor="stormy">stormy</label>
            </div>
            <div>
              <input
                type="radio"
                id="windy"
                name="weather"
                value="windy"
                checked={formData.weather === 'windy'}
                onChange={handleChange}
              />
              <label htmlFor="windy">windy</label>
            </div>
          </div>
          <div>
            <input type="text"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="comment"
            />
          </div>
          <button type="submit">add</button>
        </form>
      </div>
      <div>
        <h2>Diary entries</h2>
        {diaryEntries.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <div>visiblity: {entry.visibility}</div>
            <div>weather: {entry.weather}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
