import { useState, useEffect } from 'react';

import CoinCard from './components/CoinCard';
import LimitSelector from './components/LimitSelector';
import FilterInput from './components/FilterInput';

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!res.ok) throw new Error('Failed to fetch Coin-Gecko Data');
        const data = await res.json();
        console.log(data);
        setCoins(data);
      } catch (er) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();

    // fetch(API_URL)
    //   .then((res) => {
    //     if (!res.ok) throw new Error('Failed to fetch Coin-Gecko Data');
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setCoins(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //     setLoading(false);
    //   });
  }, [limit]);

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(filter.toLowerCase()) || coin.symbol.toLowerCase().includes(filter.toLowerCase());
  })

  return (
    <div className=''>
      <h1>🚀Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className='error'>{error}</div>}

      <div className='top-controls'>
        <FilterInput onFilterChange={setFilter} filter={filter} />
        <LimitSelector onLimitChange={setLimit} limit={limit} />
      </div>

      {!loading && !error && (
        <main className='grid'>
          {filteredCoins.length > 0 ? filteredCoins.map((coin) => (
            <CoinCard coin={coin} key={coin.id} />
          )) : <p>No matching coins found.</p>}
        </main>
      )}
    </div>
  );
};

export default App;
