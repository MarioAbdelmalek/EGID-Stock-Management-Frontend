import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtToken } from '../jwt-token';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {

  private jwtToken!: JwtToken;
  loginForm!: FormGroup;
  private formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.formBuilder = formBuilder;
  }

  loginUser() {
    this.userService.loginUser(this.loginForm.value).subscribe(({
      next: (res) => {
        this.jwtToken = res;

        if (this.jwtToken.isValid === false) {
          alert(this.jwtToken.Message);
        }

        else {
          localStorage.setItem('user_token', this.jwtToken.Token);
          alert(this.jwtToken.Message);
          this.router.navigate(['home']);
        }
      },
      error: (err) => {
        console.log(err);
      }
    }))
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

}
