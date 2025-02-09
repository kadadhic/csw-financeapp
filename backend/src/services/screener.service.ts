import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../entities/stock.entity';
import { StockScreenerDto } from '../dto/stock-screener.dto';
import { CacheService } from './cache.service';

@Injectable()
export class ScreenerService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    private cacheService: CacheService,
  ) {}

  async getScreenerData(): Promise<StockScreenerDto[]> {
    // Try to get from cache first
    const cached = await this.cacheService.get('screener-data');
    if (cached) return cached;

    // If not in cache, fetch from DB and calculate metrics
    const stocks = await this.stockRepository.find();
    const enrichedData = await Promise.all(
      stocks.map(async (stock) => {
        const fundamentals = await this.calculateFundamentals(stock);
        const technicals = await this.calculateTechnicals(stock);
        
        return {
          ...stock,
          ...fundamentals,
          ...technicals,
          score: this.calculateScreenerScore(fundamentals, technicals),
        };
      })
    );

    // Cache the results
    await this.cacheService.set('screener-data', enrichedData, 300); // 5 minutes
    return enrichedData;
  }

  private async calculateFundamentals(stock: Stock) {
    // Add more sophisticated fundamental analysis
    return {
      pe: stock.price / stock.eps,
      pbv: stock.price / stock.bookValue,
      debtToEquity: stock.totalDebt / stock.totalEquity,
      currentRatio: stock.currentAssets / stock.currentLiabilities,
      quickRatio: (stock.currentAssets - stock.inventory) / stock.currentLiabilities,
    };
  }

  private async calculateTechnicals(stock: Stock) {
    // Add technical analysis indicators
    return {
      rsi: await this.calculateRSI(stock),
      macd: await this.calculateMACD(stock),
      bollingerBands: await this.calculateBollingerBands(stock),
    };
  }
}
