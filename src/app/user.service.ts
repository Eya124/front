import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { HttpClient,HttpHeaders,} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }
  getUserInfo(): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<User>('http://localhost:9091/api/auth/current', { headers });
  }
}

