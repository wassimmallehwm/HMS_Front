import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { ChamberService } from 'src/app/services/chamber.service';
import { Chamber } from 'src/app/models/chamber.model';

declare var swal: any;

@Component({
  selector: 'app-chamber-add',
  templateUrl: './chamber-add.component.html',
  styleUrls: ['./chamber-add.component.css']
})
export class ChamberAddComponent implements OnInit {


  title = 'titles.addChamber';
  id: any;
  public mode = 'create';
  btn = 'buttons.add';
  form: FormGroup;
  hotels: Hotel[];
  types = [];

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private hotelService: HotelService,
    private chamberService: ChamberService,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    this.form = this.fb.group({
      ref: [null, Validators.compose([Validators.required])],
      type: [null, Validators.compose([Validators.required])],
      hotel: [null, Validators.compose([Validators.required])],
    });

    this.hotelService.getAll().subscribe(
      data => {
        this.hotels = data;
      },
      error => {
        console.log(error);
      }
    );

    this.chamberService.getAllTypes().subscribe(
      (data: any) => {
        this.types = data;
        console.log(this.types);
      }, error => {
        console.log(error);
      }
    )
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('id')) {
      this.id = paramMap.get('id');
      this.mode = 'edit';
      this.btn = 'buttons.edit';
      this.title = 'titles.editChamber';
      this.chamberService.getOne(this.id).subscribe(data => {
        this.form.patchValue({
          ref : data.ref,
          type : data.type,
          hotel : data.hotel
        });
      });
    }
  });
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
      if (this.mode === 'create') {
        const chamber = new Chamber(this.form.value);
        this.chamberService.add(chamber);
      } else {
        // const role = {
        //   id: this.id,
        //   name : this.form.value.name
        // };
        const chamber = new Chamber(this.form.value);
        chamber.id = this.id;
        this.hotelService.update(chamber);
      }
    }
  }

}
