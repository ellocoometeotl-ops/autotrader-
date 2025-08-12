
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function App() {
  const [candles, setCandles] = useState([]);
  const [riskSettings, setRiskSettings] = useState({
    accountUsd: 10000,
    riskPerTrade: 0.01,
    sizing: 'atr',
    trailingAtrMult: 1.5,
  });
  const [broker, setBroker] = useState('alpaca');

  useEffect(() => {
    // Simulación de WebSocket para candles (reemplazar con backend WS real)
    const interval = setInterval(() => {
      const now = Date.now();
      const price = 100 + Math.sin(now / 100000) * 5 + Math.random() * 2;
      const newCandle = { time: now, close: price, high: price + 1, low: price - 1, open: price - 0.5 };
      setCandles((prev) => [...prev.slice(-49), newCandle]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">AutoTrader PWA - Demo</h1>
      <div className="mb-4">
        <label className="mr-2">Broker:</label>
        <select
          value={broker}
          onChange={(e) => setBroker(e.target.value)}
          className="bg-gray-800 p-2 rounded"
        >
          <option value="alpaca">Alpaca</option>
          <option value="binance">Binance</option>
          <option value="ib">Interactive Brokers</option>
        </select>
      </div>
      <div className="mb-4 p-3 bg-gray-800 rounded">
        <label>Account (USD):
          <input
            type="number"
            value={riskSettings.accountUsd}
            onChange={(e) => setRiskSettings({ ...riskSettings, accountUsd: Number(e.target.value) })}
            className="ml-2 p-1 rounded bg-gray-700 text-white w-24"
          />
        </label>
        <label className="ml-4">Risk per trade (%):
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={riskSettings.riskPerTrade * 100}
            onChange={(e) => setRiskSettings({ ...riskSettings, riskPerTrade: Number(e.target.value) / 100 })}
            className="ml-2"
          />
          <span className="ml-2">{(riskSettings.riskPerTrade * 100).toFixed(1)}%</span>
        </label>
      </div>
      <LineChart width={600} height={300} data={candles} className="mx-auto" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis
          dataKey="time"
          tickFormatter={(time) => new Date(time).toLocaleTimeString()}
          domain={['auto', 'auto']}
          type="number"
        />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip labelFormatter={(time) => new Date(time).toLocaleTimeString()} />
        <CartesianGrid stroke="#333" />
        <Line type="monotone" dataKey="close" stroke="#82ca9d" dot={false} />
      </LineChart>
      <p className="mt-4 text-center text-sm text-gray-400">Demo con datos simulados. El bot real usa datos del backend.</p>
    </div>
  );
}
