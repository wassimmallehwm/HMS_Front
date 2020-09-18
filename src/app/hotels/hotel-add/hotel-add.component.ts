import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';

declare var swal: any;

@Component({
  selector: 'app-hotel-add',
  templateUrl: './hotel-add.component.html',
  styleUrls: ['./hotel-add.component.css']
})
export class HotelAddComponent implements OnInit {

  title = 'titles.addHotel';
  id: any;
  public mode = 'create';
  btn = 'buttons.add';
  form: FormGroup;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      adresse: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      tel: [null, Validators.compose([Validators.required])],
      stars: [null, Validators.compose([Validators.required, Validators.max(5), Validators.min(1)])],
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('id')) {
      this.id = paramMap.get('id');
      this.mode = 'edit';
      this.btn = 'buttons.edit';
      this.title = 'titles.editHotel';
      this.hotelService.getOne(this.id).subscribe(data => {
        this.form.patchValue({
          name : data.name,
          adresse : data.adresse,
          city : data.city,
          tel : data.tel,
          stars : data.stars
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
        const role = new Hotel(this.form.value);
        this.hotelService.add(role);
      } else {
        // const role = {
        //   id: this.id,
        //   name : this.form.value.name
        // };
        const role = new Hotel(this.form.value);
        role.id = this.id;
        this.hotelService.update(role);
      }
    }
  }

}
