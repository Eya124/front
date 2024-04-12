import { Component, OnInit } from '@angular/core';
import { Feeds,Feed } from './feeds-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html'
})
export class FeedsComponent implements OnInit {

  users: any[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<any[]>('http://localhost:9091/user/all').subscribe(
      (response) => {
        // Filtrer les utilisateurs dont "désactiver" est false
        this.users = response.filter(user => user.desactiver === true);
      },
      (error) => {
        console.log(error);
      }
    );}

}
