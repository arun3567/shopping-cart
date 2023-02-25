import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth-guard';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductListComponent } from './product/product-list/product-list.component';

const routes: Routes = [
  // {path : "" ,redirectTo: "/login",pathMatch: 'full' },
  {path : '', component : ProductListComponent,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  {path : 'signup',component : SignupComponent},
  {path : 'cart', component : ProductCreateComponent,canActivate: [AuthGuard]},
  // {path : 'list', component : ProductListComponent},
  { path : 'shoppingCart', component : CartComponent,canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard]
})
export class AppRoutingModule { }
