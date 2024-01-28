import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  constructor( private router: Router,
    private authService:AuthService) {  }

  ngOnInit(): void {
  }

  user!: string;
  password!: string;

  login() {
    console.log("user : " + this.user);
    console.log("password : " + this.password);
    this.authService.login(this.user, this.password);
    this.router.navigate(['/home']);
  }

 


}
