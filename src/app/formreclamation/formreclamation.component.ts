import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-formreclamation',
  templateUrl: './formreclamation.component.html',
  styleUrls: ['./formreclamation.component.scss']
})
export class FormreclamationComponent implements OnInit {

  user: User;
  reclamationObject: String;
  reclamationDescription: String;
  constructor(private router: Router,private http: HttpClient ) {}

  ngOnInit(): void {
    this.user = history.state.user;
  }

  submitForm(event: Event): void {
    event.preventDefault();

    // Create an object to hold the form data
    const formData = {
      reclamationObject: this.reclamationObject,
      description: this.reclamationDescription
    };
    console.log("lid de user qui va etre reclamé : " + this.user.idUser);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any>('http://localhost:9091/api/auth/current', { headers }).subscribe({
      next: (userrec: User) => {
      console.log("user qui reclame id : " + userrec.idUser)
      const iduserrec = userrec.idUser;
      const iduserarec = this.user.idUser;
      this.http.post<any>(`http://localhost:9091/reclamation/post/${iduserrec}/${iduserarec}`, formData)
      .subscribe(
        response => {
          // Handle the response if needed
          console.log(response);
        },
        error => {
          // Handle the error if needed
          console.error(error);
        }
    );}
      })
}
}


