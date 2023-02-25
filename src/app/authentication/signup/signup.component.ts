import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : User[]=[];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newUser = new User(value.userName, value.email, value.password);

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const existingUser = users.find((user: User) =>
    (user.email === newUser.email,user.userName === newUser.userName));
    if (existingUser) {
      alert('Username or Email already exists!');
      return;
    }

    users.push(newUser);
    localStorage.setItem(`user${users.length}`, JSON.stringify(newUser));
    localStorage.setItem('users', JSON.stringify(users));

    console.log(newUser);
  }


}
