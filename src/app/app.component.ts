import { Component, Inject, OnInit } from '@angular/core';
//import { HttpClient } from '@microsoft/signalr';
import { SignalRService } from './signalR.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stock Management';

  constructor(public signalRService: SignalRService, private http: HttpClient) { }

  ngOnInit() {
  }


}