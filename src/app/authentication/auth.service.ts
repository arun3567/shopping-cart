import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router : Router) {}

  users : User[]=[];

  isAuthenticated! : boolean;

  private authStatusListener = new Subject<boolean>();


  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  login(value : User){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find((user: User) => user.userName === value.userName && user.email === value.email);
    if (currentUser && currentUser.password === value.password) {
      console.log('Login successful:', currentUser);
      this.router.navigate(['/']);
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true'); // set authentication status flag in local storage
      this.authStatusListener.next(true); // emit authentication status change
    } else {
      alert('Invalid Credentials!');
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated'); // clear authentication status flag in local storage
    this.authStatusListener.next(false); // emit authentication status change
  }


  signUp(newUser : User){
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
  }

  // logout() {
  //   localStorage.removeItem('currentUser');
  //   this.router.navigate(['/login']);
  //   this.isAuthenticated = false;
  //   this.authStatusListener.next(false); // emit authentication status change
  // }

  onGetUser(){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.users = users;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  checkAuthStatusOnRefresh() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.id) {
      this.isAuthenticated = true;
      this.authStatusListener.next(true); // emit authentication status change
    }
  }

}
