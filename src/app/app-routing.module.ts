import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './auth/log-in/log-in.component'
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {path: "", component: TasksComponent},
  { path: "login", component: LogInComponent },
  {path: "signup", component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule],
})

export class AppRoutingModule {}
