import React, { useEffect, useState } from 'react';
import { SERVER_CONFIG } from '../config/servers';
import './StockTicker.css';

interface TickerData {
  symbol: string;
  price: number;
  change: number;
}

const StockTicker = () => {
  const [tickerData, setTickerData] = useState<TickerData[]>([]);

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await fetch(`${SERVER_CONFIG.TRADE_SERVER}/api/ticker`);
        const data = await response.json();
        setTickerData(data);
      } catch (error) {
        console.error('Error fetching ticker data:', error);
      }
    };

    fetchTickerData();
    const interval = setInterval(fetchTickerData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stock-ticker">
      <div className="ticker-wrap">
        <div className="ticker">
          {tickerData.map((item, index) => (
            <div key={index} className="ticker-item">
              <span className="symbol">{item.symbol}</span>
              <span className={`price ${item.change >= 0 ? 'positive' : 'negative'}`}>
                ${item.price.toFixed(2)}
              </span>
              <span className={`change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockTicker; 