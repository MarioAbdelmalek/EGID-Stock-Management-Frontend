import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class OrderService {

    constructor(private http: HttpClient) {
        // move initialization code to ngOnInit. Don't forget the import and implements
    }

    getAllOrders(): Observable<any> {
        return this.http.get('https://localhost:44315/Order/getAllOrders');
    }

    createOrder(data: any) {
        return this.http.post('https://localhost:44315/Order/create', data);
    }

    deleteOrder(id: any) {
        return this.http.delete('https://localhost:44315/Order/delete?ID=' + id);
    }

    updateOrder(id: number, newPrice: any) {
        return this.http.put('https://localhost:44315/Order/update?ID=' + id + '&newPrice=' + newPrice, null);
    }
}