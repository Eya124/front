import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards: any[];

  constructor(private http: HttpClient) {
    this.topcards = [];
  }

  ngOnInit(): void {
    this.getUsersCount();
  }

  getUsersCount(): void {
    this.http.get<any>('http://localhost:9091/user/count').subscribe(
      (response) => {
        const usersCountMap = response;
        this.topcards = [
          {         bgcolor: 'success',
          icon: 'bi bi-person-fill',label: 'Year', value: usersCountMap.Year },
          { bgcolor: 'danger',
          icon: 'bi bi-person-fill',label: 'Month', value: usersCountMap.Month },
          {  bgcolor: 'warning',
          icon: 'bi bi-person-fill',label: 'Week', value: usersCountMap.Week }
        ];
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

}
