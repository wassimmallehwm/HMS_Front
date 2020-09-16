import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Airplane } from '../models/airplane';
declare var swal: any;
@Injectable({
  providedIn: 'root'
})
export class AirplaneService {

  private url = environment.apiUrl + 'airplanes/';

  constructor(private http: HttpClient,
    private router: Router) { }

    getAll() {
      return this.http.get<Airplane[]>(this.url + 'findAll');
    }
  
    getOne(id: number) {
      return this.http.get<Airplane>(this.url + 'findOne/' + id);
    }
  
    add(airplane: Airplane) {
      this.http.post(this.url + 'add', airplane).subscribe(data => {
        this.router.navigate(['/airplanes/list']);
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
  
    update(airplane: any) {
      this.http.put(this.url + 'update/' + airplane.id, airplane).subscribe(data => {
        this.router.navigate(['/airplanes/list']);
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
