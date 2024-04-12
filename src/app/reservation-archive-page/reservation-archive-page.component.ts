import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as events from 'events';

@Component({
  selector: 'app-reservation-archive-page',
  templateUrl: './reservation-archive-page.component.html',
  styleUrls: ['./reservation-archive-page.component.scss']
})
export class ReservationArchivePageComponent implements OnInit {
  appointmentsData: any;
  total: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.appointmentsData = this.getAppointments(1);
  }
  getAppointments(id: any): void {
    this.http.get<events[]>("http://localhost:9091/reservation/getAllEventsArchive/"+id)
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
}
