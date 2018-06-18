import { Routes } from '@angular/router';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { RegisterComponent } from './components/register/register.component';
import { UserGuard } from './services/user.guard';

export const rootRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'landing',
    component: ProjectsListComponent
  },
  {
    path: 'edit',
    component: EditProjectComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'add',
    component: AddProjectComponent,
    canActivate: [UserGuard]
  },

  { path: '**', component: PageNotFoundComponent }
];
