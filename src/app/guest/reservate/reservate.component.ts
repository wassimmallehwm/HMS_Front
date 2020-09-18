import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import { ChamberService } from 'src/app/services/chamber.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservation } from 'src/app/models/reservation.model';

declare var swal: any;
@Component({
  selector: 'app-reservate',
  templateUrl: './reservate.component.html',
  styleUrls: ['./reservate.component.css']
})
export class ReservateComponent implements OnInit {

  step: number = 1;

  clientId: number;

  title = 'titles.addclient';
  hotelId: any;
  public mode = 'create';
  btn = 'buttons.add';
  form: FormGroup;
  formReservation: FormGroup;
  hotels: Hotel[];
  types = [];

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private chamberService: ChamberService,
    private clientsService: ClientsService,
    private router: Router,
    private translate: TranslateService,
    private reservationService: ReservationsService) { }

  ngOnInit() {
    this.clientForm();
    this.reservationForm();
    this.getAllTypes();


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.hotelId = paramMap.get('id');
        }
      });
  }

  calculate(event){
    let price = 0;
    if(this.formReservation.value.chamberType){
      const type = this.types.find(elem => elem.name == this.formReservation.value.chamberType);
      price = type.price_per_night;
    }
    if(this.formReservation.value.duration){
      price = price * this.formReservation.value.duration;
    }
    this.formReservation.patchValue({price : price});
  }

  clientForm(){
    this.form = this.fb.group({
      cin: [null, Validators.compose([Validators.required])],
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      age: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
    });
  }

  reservationForm(){
    this.formReservation = this.fb.group({
      chamberType: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      nbAdultes: [null, Validators.compose([Validators.required])],
      nbKids: [null, Validators.compose([Validators.required])],
    });
  }

  getAllTypes(){
    this.chamberService.getAllTypes().subscribe(
      (data: any) => {
        this.types = data;
        console.log(this.types);
      }, error => {
        console.log(error);
      }
    )
  }

  onSubmit() {
    if (this.form.invalid) {
      let msg: string;
      for (let key in this.form.value) {
        if (this.form.get(key).invalid) {
          let error: string;
          if (this.form.get(key).hasError('required')) {
            error = this.translate.instant('errors.requiredField');
          } else {
            error = this.translate.instant('errors.invalid');
          }
          msg = this.translate.instant('shared.' + key) + ' ' + error;
          break;
        }
      }
      swal({
        title: this.translate.instant('errors.error'),
        text: msg,
        type: 'error'
      });
      return;
    } else {
        const client = new Client(this.form.value);
        this.clientsService.add(client).subscribe((data: any) => {
          this.clientId = data;
          this.setStep(2);
        }, error => {
          swal({
            title: 'Warning !',
            text: error.error.message,
            type: 'warning'
          });
        });
    }
  }

  onSubmitReservation() {
    if (this.formReservation.invalid) {
      let msg: string;
      for (let key in this.formReservation.value) {
        if (this.formReservation.get(key).invalid) {
          let error: string;
          if (this.formReservation.get(key).hasError('required')) {
            error = this.translate.instant('errors.requiredField');
          } else {
            error = this.translate.instant('errors.invalid');
          }
          msg = this.translate.instant('shared.' + key) + ' ' + error;
          break;
        }
      }
      swal({
        title: this.translate.instant('errors.error'),
        text: msg,
        type: 'error'
      });
      return;
    } else {
        const reservation = new Reservation(this.formReservation.value);
        this.reservationService.add(reservation, this.clientId, this.hotelId).subscribe((data: any) => {
          this.setStep(3);
        }, error => {
          swal({
            title: 'Warning !',
            text: error.error.message,
            type: 'warning'
          });
        });
    }
  }

  setStep(step){
    this.step = step;
  }

}
