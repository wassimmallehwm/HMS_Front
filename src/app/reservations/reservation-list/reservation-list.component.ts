import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationsService } from 'src/app/services/reservations.service';

declare var swal: any;
@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[];

  constructor(
    private router: Router,
    private translate: TranslateService,
    private reservationService: ReservationsService) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getAll().subscribe(
      data => {
        console.log(data);
        this.reservations = data;
      }, error => {
        console.log(error);
      }
    )
  }

  goToAdd(){
    this.router.navigate(['/reservations/add']);
  }

  goToEdit(id: number){
    this.router.navigate(['/reservations/' + id]);
  }


  onDelete(id: number){
    const canceled = this.translate.instant('shared.canceled');
    const notDeleted = this.translate.instant('shared.notDeleted');
    swal({
      title: this.translate.instant('buttons.confirm'),
      text: this.translate.instant('buttons.delete') + '?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('shared.yes'),
      cancelButtonText: this.translate.instant('shared.cancel')
    })
    .then(willDelete => {
      if (willDelete) {
        this.reservationService.delete(id).subscribe(data => {
          this.getReservations();
          swal({
            title: this.translate.instant('shared.deleted'),
            text: this.translate.instant('shared.deleted'),
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
            text:  notDeleted,
            type: 'info'
          });
        }
    });
  }

}
