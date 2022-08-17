import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StockService } from '../stocks/stock.service';
import { Stock } from '../stocks/stock';
import { SignalRService } from 'src/app/main/signalR.service';
import { CreateOrderDialogComponent } from '../create-order-dialog/create-order-dialog.component';
import { UpdateOrderDialogComponent } from '../update-order-dialog/update-order-dialog.component';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderService: OrderService;
  stockService: StockService;
  signalRService: any;
  private dialog!: MatDialog;
  stockList: Stock[] = [];
  orderList: any;

  displayedColumns: string[] = ['ID', 'Price', 'Quantity', 'Commission', 'StockName', 'BrokerID', 'ClientID', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(orderService: OrderService, dialog: MatDialog, stockService: StockService, signalRService: SignalRService) {
    this.orderService = orderService;
    this.stockService = stockService;
    this.dialog = dialog;
    this.signalRService = signalRService;
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
        this.orderList = res;
        this.dataSource = new MatTableDataSource(this.orderList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
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
      error: () => {
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
    this.orderService.deleteOrder(id).subscribe(() => {
      this.getAllOrders();
    })
  }

  ngOnInit(): void {
    this.getAllOrders();

    this.signalRService.startConnection();
    this.signalRService.updatedOrderList.subscribe((item: any) => {
      for (var order of item) {

        var oldOrder = this.orderList.find((obj: { ID: any; }) => {

          return obj.ID == order.ID;
        });

        if (oldOrder != null) {
          var orderIndex = this.orderList.indexOf(oldOrder);
          this.orderList[orderIndex] = order;
        }
        else {
          this.orderList.push(order);
        }
      }

      this.dataSource = new MatTableDataSource(this.orderList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }
}
