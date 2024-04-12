import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {
  nomevent: string = '';
  email: string = '';
  token: any = localStorage.getItem("access_token"); // Replace with your actual token

  reservationForm: FormGroup;

  constructor(private httpClient: HttpClient,private router: Router) { }

  ngOnInit() {
    this.reservationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nomevent: new FormControl('', [Validators.required])
    });
  }

  register() {
    const registerDto = {
      nomevent: this.nomevent,
      email: this.email
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

    // Créez l'en-tête d'autorisation
    const headers = new HttpHeaders({
      'Authorization':'Bearer Token ' + this.token
    });
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    };*/
    console.log(headers);
    this.httpClient.get<any[]>('http://localhost:9002/reservations',{ headers } ).subscribe(
      (response) => {
        // Filtrer les utilisateurs dont "désactiver" est false
        //console.log(response);
        
      },
      (error) => {
        console.log(error);
        console.log(headers);

      }
    );

    // Ajoutez l'en-tête d'autorisation à la requête POST
    this.httpClient.post('http://localhost:9002/reservations/res', registerDto, {headers} ).subscribe((response) => {
      // Filtrer les utilisateurs dont "désactiver" est false
      //console.log(response);

      
    },
    (error) => {
      //console.log(error);
    });
  }

  onSubmit() {
    // Envoyer les données du formulaire
    console.log(this.reservationForm.value);
  }

  onCancel() {
    // Annuler la réservation
    // ...
  }
}