import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/role';
import { TranslateService } from '@ngx-translate/core';

declare var swal: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any;

  constructor(private userService: UserService,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getRoleName(role: any) {
    const rolename = role[0].name.split('_', 2);
    return rolename[1];
  }

  getAllUsers(){
    this.userService.getAll().subscribe((data: any) => {
      this.users = data;
    });
  }

  goToAdd(){
    this.router.navigate(['/users/add']);
  }

  goToEdit(id: number){
    this.router.navigate(['/users/' + id]);
  }

  onDelete(id: number, name: string){
    const canceled = this.translate.instant('shared.canceled');
    const notDeleted = this.translate.instant('shared.notDeleted');
    swal({
      title: this.translate.instant('buttons.confirm'),
      //text: this.translate.instant('buttons.delete') + ' ' + name + '?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('shared.yes'),
      cancelButtonText: this.translate.instant('shared.cancel')
    })
    .then(willDelete => {
      if (willDelete) {
        this.userService.delete(id).subscribe(data => {
          swal({
            title: this.translate.instant('shared.deleted'),
            text: name + ' ' + this.translate.instant('shared.deleted'),
            type: 'success'
          });
          this.getAllUsers();
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
            //text: name + ' ' + notDeleted,
            type: 'info'
          });
        }
    });
  }


}
