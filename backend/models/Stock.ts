import { Schema } from 'mongoose';

export const StockSchema = new Schema({
  symbol: String,
  companyName: String,
  currentPrice: Number,
  marketCap: Number,
  peRatio: Number,
  volume: Number,
  dayHigh: Number,
  dayLow: Number,
  yearHigh: Number,
  yearLow: Number,
  dividend: Number,
}); 