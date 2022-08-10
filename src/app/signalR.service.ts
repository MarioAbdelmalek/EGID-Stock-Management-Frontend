import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Subject } from 'rxjs';
import { Stock } from './stocks/stock';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {

    public updatedStockList: Subject<Stock[]> = new Subject<Stock[]>();
    private hubConnection!: signalR.HubConnection;

    public startConnection = () => {

        this.hubConnection = new signalR.HubConnectionBuilder()
            //.configureLogging(signalR.LogLevel.Debug)
            .withUrl('https://localhost:44315/StockChange')
            .build();

        this.hubConnection.on('UpdateStockPrices', (data) => {
            this.updatedStockList.next(JSON.parse(data));

        });

        this.hubConnection
            .start()
            .then(() => console.log('Connection Started'))
            .catch(err => console.log('Error While Starting Connection: ' + err))
    }
}