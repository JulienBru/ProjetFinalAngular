import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  loggedIn = false;

  private loggedInUser: any;

    users = [
      { username: 'user1', password: 'password1', role: 'user' },
      { username: 'admin1', password: 'adminpassword1', role: 'admin' },
  ];

  login(username: string, password: string) {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    console.log(user);
    console.log(this.users);
    if (user !== undefined) {
      this.loggedInUser = user;
      this.loggedIn = true;
      console.log("user : " + this.loggedInUser.username);
    }else{

    this.loggedIn = false;
    console.log("invalid user")
    }
  }

  logout(): void {
    this.loggedInUser = null;
    this.loggedIn = false;
  }

  isadmin(): boolean {
    return this.loggedInUser && this.loggedInUser.role === 'admin';
  }


  logIn() {
    this.loggedIn = true;
  }
  logOut() {
    this.loggedIn = false;
  }

  isAdmin(){
    const isUserAdmin = new Promise(
      (resolve,reject) => {
        resolve(this.loggedIn);
      }
    );
    return isUserAdmin;
  }

  constructor() { }
}

