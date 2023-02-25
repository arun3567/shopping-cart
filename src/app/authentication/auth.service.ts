import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  users : User[]=[];

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  onGetUser(){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.users = users;
  }



}
