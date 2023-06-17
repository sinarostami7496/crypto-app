import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketsListComponent } from './markets-list/markets-list.component';
import { MarketsSymbolDetailsComponent } from './markets-symbol-details/markets-symbol-details.component';

const routes: Routes = [
  {
    path: 'list',
    component: MarketsListComponent
  },
  {
    path: ':symbol/details',
    component: MarketsSymbolDetailsComponent
  },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketsRoutingModule { }
