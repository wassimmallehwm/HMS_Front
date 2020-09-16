import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/role';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { SignUpInfo } from 'src/app/models/signup-info';
import { AuthService } from 'src/app/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

declare var swal: any;

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  title = 'titles.addUser';
  id: any;
  public mode = 'create';
  btn = 'buttons.add';
  isAdmin = false;
  form: FormGroup;
  roles: Role[];

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private authService: AuthService,
    private translate: TranslateService
    ) { }

  ngOnInit() {
    this.buildForm();
    this.getRoles();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('id')) {
      this.id = paramMap.get('id');
      this.mode = 'edit';
      this.btn = 'buttons.edit';
      this.title = 'titles.editUser';
      this.updateFormValidators();
      this.userService.getOne(this.id).subscribe(data => {
        if(data.roles[0].name ==='ROLE_ADMIN'){
          this.isAdmin = true;
          this.form.controls['role'].disable();
        }
        this.form.patchValue({
          fullname : data.name,
          username: data.username,
          email: data.email,
          role: data.roles[0].name
        });
      });
    }
  });
  }

  updateFormValidators(){
    this.form.controls['password'].clearValidators();
    this.form.controls['confirmpassword'].clearValidators();
    this.form.controls['password'].updateValueAndValidity();
    this.form.controls['confirmpassword'].updateValueAndValidity();
  }

  buildForm(){
    this.form = this.fb.group({
      fullname: [null, Validators.compose([Validators.required])],
      username: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      role: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      confirmpassword: [null, Validators.compose([Validators.required])]
    });
  }

  getRoleName(name: string) {
    const rolename = name.split('_', 2);
    return rolename[1];
  }

  getRoles(){
    this.roleService.getAll().subscribe((data: any) => {
      this.roles = data;
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

        if(this.form.value.password !== this.form.value.confirmpassword){
          swal({
            title: this.translate.instant('errors.error'),
            text: this.translate.instant('errors.passwordMatch'),
            type: 'error'
          });
          return;
        } else {

        const user = new SignUpInfo(
          this.form.value.fullname,
          this.form.value.username,
          this.form.value.email,
          this.form.value.role,
          this.form.value.password
          );
        this.authService.signUp(user);
        }
      } else {
        let updatedRole = null;
        if(this.isAdmin){
          updatedRole = ['ROLE_ADMIN'];
        } else {
          updatedRole = [this.form.value.role];
        }
          const user = {
            id: this.id,
            name : this.form.value.fullname,
            username : this.form.value.username,
            email : this.form.value.email,
            roles : updatedRole
          };
          this.userService.update(user);
        }

    }
  }

}
