import { Component, OnInit } from '@angular/core';
import { MarketsService } from './../markets.service';

@Component({
  selector: 'app-markets-list',
  templateUrl: './markets-list.component.html',
  styleUrls: ['./markets-list.component.scss']
})
export class MarketsListComponent implements OnInit {

  private _markets: any[] = [];
  onlyFavorites: boolean = false;
  searchSymbol: string = '';

  constructor(
    private marketsService: MarketsService
  ) {
  }

  get markets() {
    return (this.onlyFavorites ? this._markets.filter(f => f.isFavorite) : this._markets).filter(f => f.symbol.toLowerCase().includes(this.searchSymbol.toLowerCase()));
  }

  ngOnInit(): void {

    this.marketsService.getMarkets().subscribe(({ result }) => {

      this._markets = Object.entries<Object>(result.symbols).reduce((total: any[], [, current]) => {

        return [...total, current];
      }, [])
        .sort(function (a, b) {
          if (isFinite(b.stats['24h_volume'] - a.stats['24h_volume'])) {
            return b.stats['24h_volume'] - a.stats['24h_volume'];
          } else {
            return isFinite(a.stats['24h_volume']) ? -1 : 1;
          }
        }).map(m => ({
          ...m,
          isFavorite: this.isFavorite(m.symbol)
        }))

    });
  }

  private isFavorite(symbol: string) {
    const favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some(s => s === symbol);
  }

  addToFavorite(data: any) {

    let favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.some(s => s === data.symbol);
    favorites = !isFavorite ? [...favorites, data.symbol] : favorites.filter(f => f !== data.symbol);
    localStorage.setItem('favorites', JSON.stringify(favorites))

    data.isFavorite = !isFavorite;
  }

}
