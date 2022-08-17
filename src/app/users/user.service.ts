import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
        // move initialization code to ngOnInit. Don't forget the import and implements
    }

    registerUser(data: any) {
        return this.http.post('https://localhost:44315/api/User/register', data);
    }

    loginUser(data: any) : Observable<any> {
        return this.http.post('https://localhost:44315/api/User/authenticate', data, { withCredentials: true });
    }
}