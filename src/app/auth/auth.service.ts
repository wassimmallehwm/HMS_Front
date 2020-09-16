import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthLoginInfo } from '../models/login-info';
import { JwtResponse } from '../models/jwt-response';
import { SignUpInfo } from '../models/signup-info';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { User } from '../models/user';

declare var swal: any;
const url = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = url + 'users/signin';
  private signupUrl = url + 'users/signup';
  private refreshUrl = url + 'users/refreshToken';
  private validateUrl = url + 'users/validateToken';
  private currentUser = url + 'users/currentUser';


  constructor(private http: HttpClient, private router: Router,
    private tokenStorage: TokenStorageService) {
  }

  attemptAuth(credentials: AuthLoginInfo){
    this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.user);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.router.navigate(['/home']);
      }, error => {
        swal({
          title: 'Warning !',
          text: error.error.message,
          type: 'warning'
        });
      }
    );
  }

  signUp(info: SignUpInfo) {
    this.http.post(this.signupUrl, info, httpOptions).subscribe(data => {
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

  refreshToken() {
    this.http.get(this.refreshUrl, {responseType: 'text'}).subscribe(value => {
      this.tokenStorage.saveToken(value);
    });
  }

  validateToken() {
    return this.http.get(this.validateUrl);
  }

  getCurrentUser() {
    return this.http.get(this.currentUser).subscribe((value: User) => {
      this.tokenStorage.saveUser(value);
    });
  }
}
