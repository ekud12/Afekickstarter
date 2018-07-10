import { Routes } from '@angular/router';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ContainerComponent } from './components/container/container.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './services/admin.guard';
import { UserEditGuard } from './services/user-edit.guard';

export const rootRoutes: Routes = [
  { path: '', redirectTo: '/home/projects', pathMatch: 'full' },
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
        path: 'edit/:uid',
        component: EditProjectComponent,
        canActivate: [UserEditGuard]
      },
      {
        path: 'add',
        component: AddProjectComponent,
        canActivate: [UserEditGuard]
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [AdminGuard]
      },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];
