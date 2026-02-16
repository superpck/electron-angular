import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Examples } from './examples/examples';
import { Login } from './login/login';
import { Signup } from './signup/signup';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'examples',
    component: Examples,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },
];
