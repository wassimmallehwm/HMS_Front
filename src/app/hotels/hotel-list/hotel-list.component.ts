import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';

declare var swal: any;

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

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

  arrayOne(n: number): any[] {
    return Array(n);
  }

  goToAdd(){
    this.router.navigate(['/hotels/add']);
  }

  goToEdit(id: number){
    this.router.navigate(['/hotels/' + id]);
  }


  onDelete(id: number, name: string){
    const canceled = this.translate.instant('shared.canceled');
    const notDeleted = this.translate.instant('shared.notDeleted');
    swal({
      title: this.translate.instant('buttons.confirm'),
      text: this.translate.instant('buttons.delete') + ' ' + name + '?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('shared.yes'),
      cancelButtonText: this.translate.instant('shared.cancel')
    })
    .then(willDelete => {
      if (willDelete) {
        this.hotelService.delete(id).subscribe(data => {
          this.getHotels();
          swal({
            title: this.translate.instant('shared.deleted'),
            text: name + ' ' + this.translate.instant('shared.deleted'),
            type: 'success'
          });
        }, error => {
            swal({
              title: 'Warning !',
              text: error.error.message,
              type: 'warning'
            });
        });
      }}, function(dismiss){
        if(dismiss == 'cancel'){
          swal({
            title: canceled,
            text: name + ' ' + notDeleted,
            type: 'info'
          });
        }
    });
  }

}
