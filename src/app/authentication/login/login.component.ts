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

  constructor(private router : Router,private service : AuthService) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const currentUser = users.find((user: User) => user.userName === value.userName && user.email === value.email);

    if (currentUser && currentUser.password === value.password) {
      console.log('Login successful:', currentUser);
      this.router.navigate(['/home']);
    } else {
      alert('Invalid Credentials!');
    }
    this.service.onGetUser();

  }



}
