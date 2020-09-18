import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';

declare var swal: any;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  hotels: Hotel[];

  constructor(
    private router: Router,
    private translate: TranslateService,
    private hotelService: HotelService) { }

  ngOnInit() {
    this.getHotels();
  }

  getHotels() {
    this.hotelService.getAll().subscribe(
      data => {
        console.log(data);
        this.hotels = data;
      }, error => {
        console.log(error);
      }
    )
  }

}
