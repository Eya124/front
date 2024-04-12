import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as events from 'events';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})

export class ReservationPageComponent implements OnInit {
  appointmentsData: any;
   total: any;
   errorMessage!: string;

   currentDate: Date = new Date();

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.appointmentsData = this.getAppointments(1 );
  }
  getAppointments(id: any): void {
    this.http.get<events[]>("http://localhost:9091/reservation/"+id)
      .subscribe((data : events[])=> {
        let renamedData = data.map((appointment: any) => {
          let reservationId = '';
      for (let reservation of appointment.reservations) {
        if (reservationId === '' && reservation.idReservation) {
          reservationId = reservation.idReservation;
        }
      }
          return {
            text: appointment.title,
            startDate: appointment.dateDebut,
            endDate: appointment.dateFin,
            idReservation: reservationId
          };
        });
        this.total =renamedData.length;
        this.appointmentsData = renamedData;
      });
  }
  addReservation(){
    this.http.post("http://localhost:9091/evenement/addAndAssign/2/13", {}).subscribe(
      data => {
        // La réservation a été effectuée avec succès
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'La réservation a été effectuée avec succès.'
        });
        this.total = this.total + 1;
      },
    (error: HttpErrorResponse) => {
    
      if (error.error instanceof ErrorEvent) {
        this.errorMessage = 'Une erreur s\'est produite lors de la réservation.';
      } else {
        // Afficher le corps de la réponse de la requête qui a échoué
        this.errorMessage = error.error.error;
        
      }
       // Afficher la boîte de dialogue d'erreur
       Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: this.errorMessage
      });
    }
    );

  }
  deleteEvent(event: any) {
    let eventId = event.appointmentData.idReservation; // Récupérer l'identifiant de l'événement
    const url = `http://localhost:9091/reservation/archiverReservation/${eventId}`;
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer cet événement?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // L'utilisateur a cliqué sur le bouton "Supprimer"
        // Supprimer l'événement correspondant à partir de votre base de données en utilisant l'identifiant de l'événement
        this.http.post(url, {}).subscribe((response: any) => {
          // Réaliser des actions supplémentaires si nécessaire
          this.total = this.total - 1;
        });
  
        // Afficher une boîte de dialogue de confirmation de suppression
        Swal.fire(
          'Supprimé!',
          'La réservation a été supprimé avec succès.',
          'success'
        );  }
      });
}
}