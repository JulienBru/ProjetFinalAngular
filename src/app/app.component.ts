import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion de devoirs';
  opened = false;

  constructor(private authService: AuthService,
              private router: Router,
              ) {}

  openLogin() {
    this.router.navigate(['/login']);
  }            
  login() {
    if (!this.authService.loggedIn) {
      this.authService.logIn();
    } else {
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
  }
  logout() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
