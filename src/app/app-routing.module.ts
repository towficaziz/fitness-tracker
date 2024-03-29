
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'', component: WelcomeComponent},
  { path: '', loadChildren: () =>
  import('./training/training.module').then(m => m.TrainingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
