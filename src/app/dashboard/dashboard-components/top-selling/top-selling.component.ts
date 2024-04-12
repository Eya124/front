import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Product,TopSelling} from './top-selling-data';
import { HttpClient } from '@angular/common/http';
import { Reclamation } from 'src/app/models/Reclamation';




@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html'
})
export class TopSellingComponent implements OnInit {

  topSelling:Product[];
  claims: Reclamation[];

  
  

  constructor(private http:HttpClient,private router:Router) { 

    this.topSelling=TopSelling;
 
  
  }
  
  
  ngOnInit(): void {
    this.getClaims();

  }

  getClaims() {
    this.http.get<Reclamation[]>('http://localhost:9091/reclamation/getall').subscribe(response => {
    
      this.claims = response;
      console.log(response);
    });
  }

  readRec(claim: Reclamation){
      this.router.navigate(["dashboard/reclamations"],{ state: { claim }})
  }

}
  
