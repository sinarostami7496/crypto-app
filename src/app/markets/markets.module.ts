import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarketsListComponent } from './markets-list/markets-list.component';
import { MarketsRoutingModule } from './markets-routing.module';
import { MarketsSymbolDetailsComponent } from './markets-symbol-details/markets-symbol-details.component';
import { MarketsService } from './markets.service';

@NgModule({
  declarations: [
    MarketsListComponent,
    MarketsSymbolDetailsComponent
  ],
  imports: [
    CommonModule,
    MarketsRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [MarketsService]
})
export class MarketsModule { }
