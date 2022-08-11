import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../orders/orderServices/order.service';
import { Stock } from '../stocks/stock';
import { StockService } from '../stocks/stock.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.css']
})
export class CreateOrderDialogComponent implements OnInit {

  orderForm!: FormGroup;
  private formBulider: FormBuilder;
  orderService: OrderService;
  stockService: StockService;
  stockList: Stock[] = [];

  constructor(formBulider: FormBuilder, orderService: OrderService, stockService: StockService,
    private dialogRef: MatDialogRef<CreateOrderDialogComponent>) {
    this.formBulider = formBulider;
    this.orderService = orderService;
    this.stockService = stockService;
  }

  ngOnInit(): void {
    this.orderForm = this.formBulider.group({
      StockID: ['', Validators.required],
      Price: ['', Validators.required],
      Quantity: ['', Validators.required]
    })
    this.getAllStocks()
  }

  createOrder() {
    this.orderService.createOrder(this.orderForm.value).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        alert("Error Creating The Order!!")
      }
    })
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
}
