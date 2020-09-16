import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/role';
import { TranslateService } from '@ngx-translate/core';

declare var swal: any;

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {

  title = 'titles.addRole';
  id: any;
  public mode = 'create';
  btn = 'buttons.add';
  form: FormGroup;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('id')) {
      this.id = paramMap.get('id');
      this.mode = 'edit';
      this.btn = 'buttons.edit';
      this.title = 'titles.editRole';
      this.roleService.getOne(this.id).subscribe(data => {
        this.form.patchValue({
          name : this.getRoleName(data.name)
        });
      });
    }
  });
  }

  getRoleName(name: string) {
    const rolename = name.split('_', 2);
    return rolename[1];
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
        const role = new Role(this.form.value.name);
        this.roleService.add(role);
      } else {
        const role = {
          id: this.id,
          name : this.form.value.name
        };
        this.roleService.update(role);
      }
    }
  }

}
