import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth-guard';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { ErrorComponent } from './error/error.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';

const routes: Routes = [
  {path : '', component : ProductListComponent,canActivate: [AuthGuard]},
  {path : 'login' , component : LoginComponent},
  {path : 'signup' , component: SignupComponent},
  {path : 'cart', component : ProductCreateComponent,canActivate: [AuthGuard]},
  {path : 'product/:id', component: ProductDetailsComponent,canActivate: [AuthGuard] },
  {path : 'shoppingCart', component : CartComponent,canActivate: [AuthGuard]},
  {path : '**',component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard]
})
export class AppRoutingModule {}
