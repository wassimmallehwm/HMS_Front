import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from 'src/app/models/signup-info';
import { AuthService } from '../auth.service';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: any;

  constructor(private authService: AuthService,
    private roleService: RoleService,
    private router: Router) { }

  ngOnInit() {
    this.roleService.getAll().subscribe((data: any) => {
      this.roles = data;
    });
  }

  onSubmit() {
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.role);

    this.authService.signUp(this.signupInfo);
  }
}
