
const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from AutoTrader backend!' });
});

// Simulación WebSocket: envia candles a clientes conectados
wss.on('connection', (ws) => {
  console.log('Client connected to WS');
  const interval = setInterval(() => {
    const now = Date.now();
    const price = 100 + Math.sin(now / 100000) * 5 + Math.random() * 2;
    const candle = { time: now, close: price, high: price + 1, low: price - 1, open: price - 0.5 };
    ws.send(JSON.stringify({ type: 'candle', data: candle }));
  }, 3000);
  ws.on('close', () => clearInterval(interval));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
