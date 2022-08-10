import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class StockService {

    constructor(private http: HttpClient) {
        // move initialization code to ngOnInit. Don't forget the import and implements
    }

    getAllStocks(): Observable<any> {
        return this.http.get('https://localhost:44315/Stock/getAllStocks');
    }
}