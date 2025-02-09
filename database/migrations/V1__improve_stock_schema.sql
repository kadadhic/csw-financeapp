-- Improve stock table with more detailed information
ALTER TABLE stocks
ADD COLUMN sector VARCHAR(100),
ADD COLUMN industry VARCHAR(100),
ADD COLUMN market_cap DECIMAL(20,2),
ADD COLUMN dividend_yield DECIMAL(5,2),
ADD COLUMN beta DECIMAL(5,2),
ADD COLUMN fifty_day_ma DECIMAL(10,2),
ADD COLUMN two_hundred_day_ma DECIMAL(10,2),
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Add indexes for better query performance
CREATE INDEX idx_stock_symbol ON stocks(symbol);
CREATE INDEX idx_stock_sector ON stocks(sector);
CREATE INDEX idx_stock_market_cap ON stocks(market_cap);

-- Create a new table for historical prices
CREATE TABLE stock_historical_prices (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    stock_id BIGINT,
    price DECIMAL(10,2),
    volume BIGINT,
    date DATE,
    FOREIGN KEY (stock_id) REFERENCES stocks(id),
    INDEX idx_stock_date (stock_id, date)
);
