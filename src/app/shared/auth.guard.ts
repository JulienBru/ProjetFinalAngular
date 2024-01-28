import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {inject} from '@angular/core'


export const authGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let router = inject(Router);

  return authService.isAdmin().then(authentifie => {
      if(authentifie){
        console.log("admin");
        return true;
      }
      else{
        console.log("pas admin");
        router.navigate(['/home']);
        return false;
      }
    });
};
