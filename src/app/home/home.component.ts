import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { User } from '../authentication/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{

  users : User[]=[];
  constructor(private authService : AuthService) { };
  private authStatusSubs! : Subscription;

  isUserAuthenticated = false;

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  ongetUser(){
    this.users = this.authService.users;
    console.log(this.users)
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authStatusSubs.unsubscribe();
  }

}
