import { Injectable } from '@angular/core';
import { User } from '../models/user';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'currentUser';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(AUTHORITIES_KEY);
  }

  public saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User) {
    localStorage.setItem(USERNAME_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    return JSON.parse(localStorage.getItem(USERNAME_KEY));
  }

  public saveAuthorities(authorities: string[]) {
    localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (localStorage.getItem(TOKEN_KEY)) {
      JSON.parse(localStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }
}
