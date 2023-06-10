
export interface Direction {
    SELL: number;
    BUY: number;
}

export interface Stats {
    bidPrice: string;
    askPrice: string;
    '24h_ch': number;
    '7d_ch': number;
    '24h_volume': string;
    '7d_volume': string;
    '24h_quoteVolume': string;
    '24h_highPrice': string;
    '24h_lowPrice': string;
    lastPrice: string;
    lastQty: string;
    lastTradeSide: string;
    bidVolume: string;
    askVolume: string;
    bidCount: number;
    askCount: number;
    direction: Direction;
}

export interface SymbolData {
    symbol: string;
    baseAsset: string;
    baseAssetPrecision: number;
    quoteAsset: string;
    quotePrecision: number;
    faName: string;
    faBaseAsset: string;
    faQuoteAsset: string;
    stepSize: number;
    tickSize: number;
    minQty: number;
    minNotional: number;
    stats: Stats;
    createdAt: Date;
}

export interface Symbols {
    [key: string]: SymbolData;
}

export interface MarketsProps {
    symbols: Symbols | null;
}

