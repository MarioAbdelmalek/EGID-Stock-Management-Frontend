import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserRegistrationComponent } from './users/user-registration/user-registration.component';

const routes: Routes = [

  { path: '', component: UserLoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'home', loadChildren: () => import('./main/main.module').then(m => m.MainModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
