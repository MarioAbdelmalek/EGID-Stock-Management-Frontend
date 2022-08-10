import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(formBulider: FormBuilder, orderService: OrderService, stockService: StockService) {
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
    this.orderService.createOrder(this.orderForm.value).subscribe((res) => {
      window.location.reload();
    })
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
}
