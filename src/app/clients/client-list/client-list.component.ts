import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[];

  constructor(
    private router: Router,
    private translate: TranslateService,
    private clientService: ClientsService) { }

  ngOnInit() {
    this.getHotels();
  }

  getHotels() {
    this.clientService.getAll().subscribe(
      data => {
        console.log(data);
        this.clients = data;
      }, error => {
        console.log(error);
      }
    )
  }

  goToAdd(){
    this.router.navigate(['/clients/add']);
  }

  goToEdit(id: number){
    this.router.navigate(['/clients/' + id]);
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
        this.clientService.delete(id).subscribe(data => {
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
