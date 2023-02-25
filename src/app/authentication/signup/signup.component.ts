import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : User[]=[];

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newUser = new User(value.userName, value.email, value.password);
    this.authService.signUp(newUser);
    console.log(newUser);
  }


}
