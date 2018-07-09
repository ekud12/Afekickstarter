import { Routes } from '@angular/router';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ContainerComponent } from './components/container/container.component';
import { DonateComponent } from './components/donate/donate.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditGuard } from './services/user-edit.guard';
import { UserInvestGuard } from './services/user-invest.guard';

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
    path: 'home',
    component: ContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
      },
      {
        path: 'projects',
        component: ProjectsListComponent
      },
      {
        path: 'details/:uid',
        component: ProjectDetailsComponent
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
        path: 'donate',
        component: DonateComponent,
        canActivate: [UserInvestGuard]
      },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];
