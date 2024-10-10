import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import {NavController} from '@ionic/angular';


export const authGuard: CanActivateFn = (route, state) => {
  const navController = inject(NavController);

  let user = localStorage.getItem("login");

  if(!user) {
    navController.navigateForward('login');
    return false;
  }else {
    return true;
  }
};
