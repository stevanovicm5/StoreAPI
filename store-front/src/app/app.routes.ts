import { Routes } from '@angular/router';
import { ProductList } from './features/products/product-list/product-list';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth.guard';
import { Register } from './features/auth/register/register';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  { path: '', component: ProductList, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-panel/admin-panel').then((m) => m.AdminPanel),
    canActivate: [adminGuard],
  },
];
