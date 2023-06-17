import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { createChart } from 'lightweight-charts';
import { map } from 'rxjs';
import { MarketsService } from '../markets.service';

@Component({
  selector: 'app-markets-symbol-details',
  templateUrl: './markets-symbol-details.component.html',
  styleUrls: ['./markets-symbol-details.component.scss']
})
export class MarketsSymbolDetailsComponent implements OnInit {

  symbol: string = '';
  symbolData: any;
  symbolContent: any;
  symbolStats: any;
  activeTab: any = { key: 'daily', title: '24 ساعت' };
  tabs = [
    { key: 'daily', title: '24 ساعت' },
    { key: 'weekly', title: '7 روز' },
    { key: 'monthly', title: '30 روز' },
    { key: 'yearly', title: '1 سال' },
    { key: 'at', title: 'از ابتدا' },
  ];
  activeAnswer: any;
  chartData: any = [];

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private marketsService: MarketsService
  ) {

    this.route.params.subscribe((res: any) => {
      this.symbol = res?.symbol;
      this.titleService.setTitle('قیمت ارزهای دیجیتال - اطلاعات نماد - ' + res.symbol);
    });
  }

  ngOnInit(): void {
    this.getSymbol();
    this.getContent();
    this.getStats();
    this.initialChart();
  }

  getSymbol() {
    this.marketsService.getMarkets().pipe(
      map((i) => {
        return {
          tmn: i.result.symbols[this.symbol + 'TMN'],
          usdt: i.result.symbols[this.symbol + 'USDT']
        }
      })).subscribe(res => {
        this.symbolData = res;
      });
  }

  getContent() {
    this.marketsService.getSymbolContent(this.symbol).subscribe(res => {
      this.symbolContent = res?.result[this.symbol] || {};
    });
  }

  getStats() {
    this.marketsService.getSymbolStats(this.symbol).subscribe(res => {
      this.symbolStats = res?.result[0] || {};
    });
  }

  changeTab(item: any) {
    this.activeTab = item;
  }

  initialChart() {
    var to = new Date();
    var from = new Date(new Date().setDate(to.getDate() - 300));
    this.marketsService.getOHLC(this.symbol + 'USDT', from.getTime().toString().substring(0, 10), to.getTime().toString().substring(0, 10), '1D').subscribe(res => {

      for (let i = 0; i < res.t.length; i++) {
        this.chartData.push({
          open: parseInt(res.o[i]),
          high: parseInt(res.h[i]),
          low: parseInt(res.l[i]),
          close: parseInt(res.c[i]),
          time: parseInt(res.t[i])
        })
      }

      const chartOptions: any = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } }, rightPriceScale: { borderVisible: false }, width: document.getElementById('chartBox')?.offsetWidth, height: document.getElementById('chartBox')?.offsetHeight };
      const chart = createChart(document.getElementById('chart') || 'chart', chartOptions);
      const candlestickSeries = chart.addCandlestickSeries({ upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });

      candlestickSeries.setData(this.chartData);

      chart.timeScale().resetTimeScale();
    });
  }

}
