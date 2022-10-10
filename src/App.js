import { useState, useEffect } from 'react';
import _ from 'lodash';
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
  const [page, setPage] = useState(0)

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
      setResults(_.chunk(yelpResults.data.businesses, 9))
    } catch(e) {
      setError(e)
    }
  }
  
  useEffect(() => {
    fetchYelpData()
  }, [sortby])

  const handlePagination = (paginate) => {
    if (paginate === 'left' && page > 0) {
      setPage(prevState => prevState - 1)
    }

    if (paginate === 'right' && page < results.length-1) {
      setPage(prevState => prevState + 1)
    } 
  }

  return (
    <div className="App">
      <h2>Welcome to Ice Cream Party!</h2>
      <select style={{marginBottom: '10px'}} onChange={(event) => setSortby(event.target.value)}>
        <option value="rating">Rating</option>
        <option value="review_count">Review Count</option>
      </select>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
        {results.length && results[page].map((icecream ) => {
          return (
            <IceCream key={icecream.id} icecream={icecream} />
          )
        })}
      </div>
      <div>
        <button onClick={() => handlePagination('left')}>{'<'}</button>
        <button onClick={() => handlePagination('right')}>{'>'}</button>
      </div>
    </div>
  );
}

export default App;
