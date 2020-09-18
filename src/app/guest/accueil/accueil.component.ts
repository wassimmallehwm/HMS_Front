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

  picIndex = 1;

  pics = [
    "https://triplanco.com/wp-content/uploads/2019/01/hotel_triplanco.jpg",
    "https://img.freepik.com/photos-gratuite/piscine-sunset_1203-3192.jpg?size=626&ext=jpg",
    "https://res.cloudinary.com/simplotel/image/upload/x_0,y_615,w_4813,h_1875,c_crop,q_80,fl_progressive/w_600,h_337,f_auto,c_fit/vits-hotels/Listing_Image_skazsy",
    "https://image.resabooking.com/images/hotel/TCL_Hotel_Royal_Kenz_Thalasso_&_Spa_.jpg",
    "https://lh3.googleusercontent.com/proxy/eHUkeH6cfGDFSMyyonkoxs0KU1w48_c-JGY_YgbItnspo6z1jxF_KwxtHLlUSBDYtbsgeoeuczmVmidsVO8oj_33mGVxZ87yTsjTdIqqisHO"

  ]

  constructor(
    private router: Router,
    private translate: TranslateService,
    private hotelService: HotelService) { }

  ngOnInit() {
    this.getHotels();
  }

  getPics(i){
    return this.pics[i];
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
