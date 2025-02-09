import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { StockSchema } from './models/Stock';
import { SERVER_CONFIG } from '../config/servers';

const app = express();
const port = 3000;

// Configure CORS to only accept requests from our frontend servers
app.use(cors({
  origin: SERVER_CONFIG.FRONTEND_SERVERS,
  credentials: true
}));

app.use(express.json());

// Connect to primary database with fallback to backup
const connectDB = async () => {
  try {
    await mongoose.connect(SERVER_CONFIG.CORE_DB_1 + '/stockdb');
    console.log('Connected to primary database');
  } catch (error) {
    console.error('Failed to connect to primary database, trying backup...');
    try {
      await mongoose.connect(SERVER_CONFIG.BACKUP_DB + '/stockdb');
      console.log('Connected to backup database');
    } catch (backupError) {
      console.error('Failed to connect to backup database');
      process.exit(1);
    }
  }
};

connectDB();

const Stock = mongoose.model('Stock', StockSchema);

app.get('/api/screener', async (req, res) => {
  try {
    const stocks = await Stock.find().limit(50);
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Listen on all network interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Screener service running on port ${port}`);
}); 