import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';
import { Router } from '@angular/router';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url = environment.apiUrl + 'roles/';

  constructor(private http: HttpClient,
    private router: Router) { }

  getAll() {
    return this.http.get<Role[]>(this.url + 'findAll');
  }

  getOne(id: number) {
    return this.http.get<Role>(this.url + 'findOne/' + id);
  }

  add(role: Role) {
    this.http.post(this.url + 'add', role).subscribe(data => {
      this.router.navigate(['/roles/list']);
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

  update(role: any) {
    this.http.put(this.url + 'update/' + role.id, role).subscribe(data => {
      this.router.navigate(['/roles/list']);
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
    return this.http.delete(this.url + 'delete/' + id)
  }
}
