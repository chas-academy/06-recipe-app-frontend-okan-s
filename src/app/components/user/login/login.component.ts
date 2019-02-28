import { AuthenticationService } from './../../../services/authentication.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthenticationService, 
    private router: Router,
  ) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  })

  loginAccount(){
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }

    this.auth.login(credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile')
      },
      err => {
        console.error(err)
      }
    )
  }

}
