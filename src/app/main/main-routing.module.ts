import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MainComponent } from './main.component';
import { OrdersComponent } from './orders/orders.component';
import { StocksComponent } from './stocks/stocks.component';

const routes: Routes = [

  {
    path: '', component: MainComponent, children: [
      { path: 'viewAllOrders', component: OrdersComponent },
      { path: 'viewAllStocks', component: StocksComponent },
      { path: '', component: HomePageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MainRoutingModule { }
