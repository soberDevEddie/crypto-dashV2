import { useState, useEffect } from 'react';
import CoinCard from './components/CoinCard';

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
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
  }, []);

  return (
    <div className=''>
      <h1>🚀Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className='error'>{error}</div>}

      {!loading && !error && (
        <main className='grid'>
          {coins.map((coin) => (
            <CoinCard coin={coin} key={coin.id} />
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
