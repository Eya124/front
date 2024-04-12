import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';


//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(private http:HttpClient) {
    this.subtitle = 'This is some text within a card block.';
  }


  ngAfterViewInit() { 
      
  }

}
