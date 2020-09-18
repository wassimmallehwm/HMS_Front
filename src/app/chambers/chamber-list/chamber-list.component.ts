import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChamberService } from 'src/app/services/chamber.service';
import { Chamber } from 'src/app/models/chamber.model';

declare var swal: any;

@Component({
  selector: 'app-chamber-list',
  templateUrl: './chamber-list.component.html',
  styleUrls: ['./chamber-list.component.css']
})
export class ChamberListComponent implements OnInit {

  chambers: Chamber[];

  constructor(
    private router: Router,
    private translate: TranslateService,
    private chamberService: ChamberService) { }

  ngOnInit() {
    this.getHotels();
  }

  getHotels() {
    this.chamberService.getAll().subscribe(
      data => {
        console.log(data);
        this.chambers = data;
      }, error => {
        console.log(error);
      }
    )
  }

  goToAdd(){
    this.router.navigate(['/chambers/add']);
  }

  goToEdit(id: number){
    this.router.navigate(['/chambers/' + id]);
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
        this.chamberService.delete(id).subscribe(data => {
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
