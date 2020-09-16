import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;

  constructor(private token: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      user: this.token.getUser(),
      authorities: this.token.getAuthorities()
    };
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['/login']);
  }
}
