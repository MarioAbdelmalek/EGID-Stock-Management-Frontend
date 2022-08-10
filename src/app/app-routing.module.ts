import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { StocksComponent } from './stocks/stocks.component';

const routes: Routes = [
  { path: 'viewAllOrders', component: OrdersComponent },
  { path: 'viewAllStocks', component: StocksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
