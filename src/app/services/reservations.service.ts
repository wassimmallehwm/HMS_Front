import { Injectable } from '@angular/core';
import { Httpreservation, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Reservation } from '../models/reservation.model';

declare var swal: any;


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private url = environment.apiUrl + 'reservations/';

  constructor(private http: Httpreservation,
    private router: Router) { }

    getAll() {
      return this.http.get<Reservation[]>(this.url + 'findall');
    }

    getOne(id: number) {
      return this.http.get<Reservation>(this.url + 'findone/' + id);
    }

    add(reservation: Reservation) {
      this.http.post(this.url + 'create', reservation).subscribe(data => {
        this.router.navigate(['/reservations/list']);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          swal({
            title: 'Warning !',
            text: error.error.message,
            type: 'warning'
          });
        }
      });
    }

    update(reservation: any) {
      const headers = new HttpHeaders;
      headers.append("Content-Type", "application/json");
      this.http.put(this.url + 'update/', reservation, {headers}).subscribe(data => {
        this.router.navigate(['/reservations/list']);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          swal({
            title: 'Warning !',
            text: error.error.message,
            type: 'warning'
          });
        }
      });
    }

    delete(id: number) {
      return this.http.delete(this.url + 'delete/' + id);
    }
}
