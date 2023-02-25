import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User[]=[];

  constructor(private router : Router,private authService : AuthService) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    const value = form.value;
    this.authService.login(value);

  }



}
