import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { TranslateService } from '@ngx-translate/core';

declare var swal: any;

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles: Role[];

  constructor(private authService: AuthService,
    private roleService: RoleService,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getAll().subscribe(data => {
      this.roles = data;
    });
  }

  goToAdd(){
    this.router.navigate(['/roles/add']);
  }

  goToEdit(id: number){
    this.router.navigate(['/roles/' + id]);
  }

  getRoleName(name: string) {
    const rolename = name.split('_', 2);
    return rolename[1];
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
        this.roleService.delete(id).subscribe(data => {
          this.getRoles();
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
