import { useState, useEffect } from 'react';
import axios from 'axios'
import IceCream from './components/IceCream/IceCream';
import './App.css';
const herokuapp = 'https://cors-anywhere.herokuapp.com/'
const apiKey = 'AgNmyFsJ6foBc2o0uxju-YL7YhvNXG4EyS51tpbKFzhFLsnp_J-dQyv7aoyPx3OE6cOro-VtGe7d0TEV93bybrCOmMSJpbBmrwd5MZ1BuliSZIsV7eGbQfbg135EY3Yx'

function App() {
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [sortby, setSortby] = useState('rating')

  const fetchYelpData = async() => {
    const config = {
      headers: {
        Authorization:
          `Bearer ${apiKey}`,
      },
      params: {
        term: "ice cream",
        limit: 50,
        sort_by: sortby,
      },
    };
    try {
      const yelpResults = await axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=Alpharetta, Georgia`, config)
      setResults(yelpResults.data.businesses)
    } catch(e) {
      setError(e)
    }
  }
  
  useEffect(() => {
    fetchYelpData()
  }, [sortby])

  return (
    <div className="App">
      <h2>Welcome to Ice Cream Party!</h2>
      <select style={{marginBottom: '10px'}} onChange={(event) => setSortby(event.target.value)}>
        <option value="rating">Rating</option>
        <option value="review_count">Review Count</option>
      </select>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
        {results.map((icecream ) => {
          return (
            <IceCream key={icecream.id} icecream={icecream} />
          )
        })}
      </div>
    </div>
  );
}

export default App;
