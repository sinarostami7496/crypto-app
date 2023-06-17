import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketsModule } from './markets/markets.module';

const routes: Routes = [
  {
    path: 'markets',
    loadChildren: () => import('./markets/markets.module').then(m => MarketsModule)
  },
  { path: '**', redirectTo: 'markets' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
