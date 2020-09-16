import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Location } from '../models/location';

declare var swal: any;
@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private url = environment.apiUrl + 'locations/';

  constructor(private http: HttpClient,
    private router: Router) { }

  getAll() {
    return this.http.get<Location[]>(this.url + 'findAll');
  }

  getOne(id: number) {
    return this.http.get<Location>(this.url + 'findOne/' + id);
  }

  add(location: Location) {
    this.http.post(this.url + 'add', location).subscribe(data => {
      this.router.navigate(['/locations/list']);
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

  update(location: any) {
    this.http.put(this.url + 'update/' + location.id, location).subscribe(data => {
      this.router.navigate(['/locations/list']);
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
