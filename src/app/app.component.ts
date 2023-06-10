import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { io, Manager } from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _markets: any[];
  onlyFavorites: boolean;
  searchSymbol: string;

  constructor(private http: HttpClient) {
    this._markets = [];
    this.onlyFavorites = false;
    this.searchSymbol = '';
  }

  get markets() {
    return (this.onlyFavorites ? this._markets.filter(f => f.isFavorite) : this._markets).filter(f => f.symbol.toLowerCase().includes(this.searchSymbol.toLowerCase()));
  }


  ngOnInit(): void {

    const socket = io("https://api.wallex.ir", {
      transports: ["websocket"],
      auth: {

      }
    });

    console.log({ socket });

    socket.on("connect", () => {

      socket.emit("subscribe", {
        "channel": "USDTTMN@marketCap"
      });

      socket.on("Broadcaster", (channel, data) => {
        if (channel == "USDTTMN@marketCap") {
          console.log(JSON.stringify(data));
        }
      });

    });

    this.http.get<any>('https://api.wallex.ir/v1/markets')
      .subscribe(({ result }) => {

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



        console.log(this._markets);

      });
  }

  private isFavorite(symbol: string) {
    const favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some(s => s === symbol);
  }

  addToFavorite(data: any) {

    let favorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.some(s => s === data.symbol);
    if (!isFavorite) {
      favorites = [...favorites, data.symbol];
    } else {
      favorites = favorites.filter(f => f !== data.symbol);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))

    data.isFavorite = !isFavorite;
  }

}
