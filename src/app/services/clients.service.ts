import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Client } from '../models/client.model';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private url = environment.apiUrl + 'clients/';

  constructor(private http: HttpClient,
    private router: Router) { }

    getAll() {
      return this.http.get<Client[]>(this.url + 'findall');
    }

    getOne(id: number) {
      return this.http.get<Client>(this.url + 'findone/' + id);
    }

    add(client: Client) {
      this.http.post(this.url + 'create', client).subscribe(data => {
        this.router.navigate(['/clients/list']);
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

    update(client: any) {
      const headers = new HttpHeaders;
      headers.append("Content-Type", "application/json");
      this.http.put(this.url + 'update/', client, {headers}).subscribe(data => {
        this.router.navigate(['/clients/list']);
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
