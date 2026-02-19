import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './home/home';
import { Blank } from './blank/blank';
import { Users } from './users/users';
import { Examples } from './examples/examples';
import { MaterialExamples } from './examples/material/material-examples';
import { TailwindExamples } from './examples/tailwind/tailwind-examples';
import { Login } from './login/login';
import { Signup } from './signup/signup';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'examples',
        component: Examples,
      },
      {
        path: 'examples/material',
        component: MaterialExamples,
      },
      {
        path: 'examples/tailwind',
        component: TailwindExamples,
      },
      {
        path: 'blank',
        component: Blank,
      },
      {
        path: 'users',
        component: Users,
      },
    ],
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
