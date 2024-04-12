import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Reclamation } from 'src/app/models/Reclamation';


@Component({
  selector: 'app-modal-reclamation',
  templateUrl: './modal-reclamation.component.html',
  styleUrls: ['./modal-reclamation.component.scss'],

})
export class ModalReclamationComponent implements OnInit {

  claim: Reclamation;
  constructor(private http:HttpClient,private router:Router,) {  this.claim = history.state.claim;}

  
  ngOnInit(): void {
  }

  toggleStatus(): void {
    this.claim.status = !this.claim.status;
    this.http.get(`http://localhost:9091/reclamation/setStatus/${this.claim.idReclamation}/${this.claim.status}`).subscribe(
      () => {
        
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Failed to update reclamation status:', error);
      }
    )}
 
}
