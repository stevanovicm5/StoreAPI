import { Routes } from '@angular/router';
import { ProductList } from './features/products/product-list/product-list';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
    {path: '', component: ProductList},
    {path: 'login', component: Login}
];
