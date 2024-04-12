import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {

  users: any[];

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit() {
    this.getUsers();
  }
  viewUser(id: string) {
    this.router.navigate(['/user', id]);
  }
  getUsers() {
    this.http.get<any[]>('http://localhost:8085/reservations').subscribe(
      (response) => {
        // Filtrer les utilisateurs dont "désactiver" est false
        this.users = response.filter(user => user.nomevent === "Event1");
      },
      (error) => {
        console.log(error);
      }
    );}
  searchValue: string = '';
  searchResults: any[] = [];



 


}
