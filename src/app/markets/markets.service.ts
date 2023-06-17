import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MarketsService {

  constructor(private http: HttpClient) {
  }

  getMarkets(): Observable<any> {
    return this.http.get<any>('https://api.wallex.ir/v1/markets');
  }

  getSymbolContent(symbol: string): Observable<any> {
    return this.http.get<any>('https://api.wallex.ir/v1/currency-content?key=' + symbol);
  }

  getSymbolStats(symbol: string): Observable<any> {
    return this.http.get<any>('https://api.wallex.ir/v1/currencies/stats?key=' + symbol);
  }

  getOHLC(symbol: string, from: any, to: any, resolution: any): Observable<any> {
    return this.http.get<any>('https://api.wallex.ir/v1/udf/history' + `?symbol=${symbol}&from=${from}&to=${to}&resolution=${resolution}`);
  }

}
