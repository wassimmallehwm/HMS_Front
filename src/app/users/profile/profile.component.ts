import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = '';

  constructor(private storageService: TokenStorageService) { }

  ngOnInit() {
    this.username = this.storageService.getUser().username;
  }

}
