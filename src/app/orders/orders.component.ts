import { Component, OnInit } from '@angular/core';
import { OrderService } from './orderServices/order.service';
import { CreateOrderDialogComponent } from '../create-order-dialog/create-order-dialog.component';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StockService } from '../stocks/stock.service';
import { Stock } from '../stocks/stock';
import { UpdateOrderDialogComponent } from '../update-order-dialog/update-order-dialog.component';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderService: OrderService;
  stockService: StockService;
  private dialog!: MatDialog;
  stockList: Stock[] = [];

  displayedColumns: string[] = ['ID', 'Price', 'Quantity', 'Commission', 'StockName', 'BrokerID', 'ClientID', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(orderService: OrderService, dialog: MatDialog, stockService: StockService) {
    this.orderService = orderService;
    this.stockService = stockService;
    this.dialog = dialog;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error While Fetching The Orders!!")
      }
    }
    );
  }

  getAllStocks() {
    this.stockService.getAllStocks().subscribe({
      next: (res) => {
        this.stockList = res;
      },
      error: (err) => {
        alert("Error While Fetching The Stocks!!")
      }
    }
    );
  }

  openCreateOrderDialog() {
    this.dialog.open(CreateOrderDialogComponent, {
      width: '400px'
    });
  }

  openUpdateOrderDialog(orderToBeUpdated: any) {
    this.dialog.open(UpdateOrderDialogComponent, {
      width: '400px',
      data: orderToBeUpdated
    });
  }

  deleteOrder(id: any) {
    this.orderService.deleteOrder(id).subscribe((res) => {
      window.location.reload();
    })
  }

  ngOnInit(): void {
    this.getAllOrders();
  }
}
