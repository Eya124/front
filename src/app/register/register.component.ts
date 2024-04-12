import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  telephone: number = 0;
  age: number = 0;
  username: string = '';
  password: string = '';
  prenomPere: string = '';
  roleName: string = '';
  adresse: string = '';
  image: string = '';
  confirmPassword: string = '';



  constructor(private httpClient: HttpClient,private router: Router) { }

  ngOnInit() {
  }

  register() {
    const registerDto = {
      nom: this.nom,
      prenom: this.prenom,
      telephone: this.telephone,
      age: this.age,
      username: this.username,
      password: this.password,
      prenomPere: this.prenomPere,
      roleName: this.roleName,
      adresse: this.adresse,
      image:this.image
    };

    const observer: Observer<any> = {
      next: response => {
        console.log('User registered successfully!');
        Swal.fire({
          title: 'Succès!',
          text: 'L\'utilisateur a été enregistré avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: error => {
        console.error('Failed to register user:', error);
        Swal.fire({
          title: 'Erreur!',
          text: 'Échec de l\'enregistrement de l\'utilisateur.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      },
      complete: () => {
        // Le cas échéant, effectuez des actions à l'achèvement de la requête
      }
    };
    this.httpClient.post('http://localhost:9091/api/auth/register', registerDto).subscribe(observer);
}
}