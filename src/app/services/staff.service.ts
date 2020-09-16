import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Staff } from '../models/staff';

declare var swal: any;
@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private url = environment.apiUrl + 'staff/';

  constructor(private http: HttpClient,
    private router: Router) { }

  getAll() {
    return this.http.get<Staff[]>(this.url + 'findAll');
  }

  getOne(id: number) {
    return this.http.get<Staff>(this.url + 'findOne/' + id);
  }

  add(staff: Staff) {
    this.http.post(this.url + 'add', staff).subscribe(data => {
      this.router.navigate(['/staff/list']);
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

  update(staff: any) {
    this.http.put(this.url + 'update/' + staff.id, staff).subscribe(data => {
      this.router.navigate(['/staff/list']);
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
