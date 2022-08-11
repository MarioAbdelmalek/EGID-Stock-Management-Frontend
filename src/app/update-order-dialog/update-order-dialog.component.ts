import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../orders/orderServices/order.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-order-dialog',
  templateUrl: './update-order-dialog.component.html',
  styleUrls: ['./update-order-dialog.component.css']
})
export class UpdateOrderDialogComponent implements OnInit {

  orderForm!: FormGroup;
  private formBulider: FormBuilder;
  private orderService: OrderService;

  constructor(formBulider: FormBuilder, orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public orderToBeUpdated: any,
    private dialogRef: MatDialogRef<UpdateOrderDialogComponent>) {
    this.formBulider = formBulider;
    this.orderService = orderService;
  }

  updateOrder() {
    this.orderService.updateOrder(this.orderToBeUpdated.ID, this.orderForm.value["Price"]).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        alert("Error Updating The Order!!")
      }
    })

  }

  ngOnInit(): void {
    this.orderForm = this.formBulider.group({
      OrderID: ['', Validators.required],
      StockName: ['', Validators.required],
      Price: ['', Validators.required],
      Quantity: ['', Validators.required]
    });

    if (this.orderToBeUpdated) {
      this.orderForm.controls['OrderID'].setValue(this.orderToBeUpdated.ID);
      this.orderForm.controls['StockName'].setValue(this.orderToBeUpdated.Stock.Name);
      this.orderForm.controls['Price'].setValue(this.orderToBeUpdated.Price);
      this.orderForm.controls['Quantity'].setValue(this.orderToBeUpdated.Quantity);
    }
  }

}
