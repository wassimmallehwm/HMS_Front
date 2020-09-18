import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Chamber } from '../models/chamber.model';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class ChamberService {

  private url = environment.apiUrl + 'chambers/';

  constructor(private http: HttpClient,
    private router: Router) { }

    getAll() {
      return this.http.get<Chamber[]>(this.url + 'findall');
    }

    getAllTypes() {
      return this.http.get(this.url + 'findall-types');
    }

    getOne(id: number) {
      return this.http.get<Chamber>(this.url + 'findone/' + id);
    }

    add(hotel: Chamber) {
      this.http.post(this.url + 'create', hotel).subscribe(data => {
        this.router.navigate(['/chambers/list']);
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

    update(chamber: any) {
      const headers = new HttpHeaders;
      headers.append("Content-Type", "application/json");
      this.http.put(this.url + 'update/', chamber, {headers}).subscribe(data => {
        this.router.navigate(['/chambers/list']);
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
