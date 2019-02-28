import { AuthenticationService } from './../../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  })

  createAccount() {
    const credentials = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    }

    this.auth.register(credentials).subscribe(
      () => {
        this.auth.login(credentials).subscribe(
          () => {
            this.router.navigateByUrl('/profile')
          },
          err => {
            console.error(err)
          }
        )
      },
      err => {
        console.error(err)
      }
    )
  }

}
