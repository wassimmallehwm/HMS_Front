import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Hotel } from '../models/hotel.model';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private url = environment.apiUrl + 'hotels/';

  constructor(private http: HttpClient,
    private router: Router) { }

    getAll() {
      return this.http.get<Hotel[]>(this.url + 'findall');
    }

    getOne(id: number) {
      return this.http.get<Hotel>(this.url + 'findone/' + id);
    }

    add(hotel: Hotel) {
      this.http.post(this.url + 'create', hotel).subscribe(data => {
        this.router.navigate(['/hotels/list']);
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

    update(hotel: any) {
      const headers = new HttpHeaders;
      headers.append("Content-Type", "application/json");
      this.http.put(this.url + 'update/', hotel, {headers}).subscribe(data => {
        this.router.navigate(['/hotels/list']);
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
