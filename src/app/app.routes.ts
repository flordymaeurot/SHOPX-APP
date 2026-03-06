import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductsComponent } from './components/products/products.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'my-order', component: MyOrderComponent },
      { path: 'order-history', component: OrderHistoryComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
