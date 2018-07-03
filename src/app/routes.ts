import { Routes } from '@angular/router';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditGuard } from './services/user-edit.guard';
import { UserReadGuard } from './services/user-read.guard';

export const rootRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [UserReadGuard]
  },
  {
    path: 'landing',
    component: ProjectsListComponent
  },
  {
    path: 'edit',
    component: EditProjectComponent,
    canActivate: [UserEditGuard]
  },
  {
    path: 'add',
    component: AddProjectComponent,
    canActivate: [UserEditGuard]
  },
  {
    path: 'details/:uid',
    component: ProjectDetailsComponent
    // canActivate: [UserGuard]
  },

  { path: '**', component: PageNotFoundComponent }
];
