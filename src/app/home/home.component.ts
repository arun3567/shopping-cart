import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { User } from '../authentication/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users : User[]=[];
  constructor(private service : AuthService) { }

  ngOnInit(): void {

  }

  ongetUser(){
    this.users = this.service.users;
    console.log(this.users)
  }

}
