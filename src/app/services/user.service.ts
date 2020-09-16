import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/user';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl + 'users/';

  constructor(private http: HttpClient, private router: Router) { }

  getAll() {
    return this.http.get<User[]>(this.url + 'findAll');
  }

  getOne(id: number) {
    return this.http.get<User>(this.url + 'findOne/' + id);
  }

  update(user: any) {
    this.http.put(this.url + 'update/' + user.id, user).subscribe(data => {
      this.router.navigate(['/users/list']);
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
