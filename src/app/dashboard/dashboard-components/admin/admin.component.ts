// admin.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  email: string;

  constructor(private http: HttpClient) {}

  addAdminRole() {
    const url = `http://localhost:9091/api/auth/admin?email=${this.email}`;
    this.http.post(url, {}).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          title: 'Succès!',
          text: 'Le rôle ADMIN a été ajouté avec succès.',
          icon: 'success'
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur s\'est produite lors de l\'ajout du rôle ADMIN.',
          icon: 'error'
        });
      }
    );
  }
}