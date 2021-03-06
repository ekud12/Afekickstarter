import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';
import { SlideshowModule } from 'ng-simple-slideshow';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ContainerComponent } from './components/container/container.component';
import { DonationBoxComponent } from './components/donation-box/donation-box.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleProjectCardComponent } from './components/single-project/single-project.component';
import { materialImports } from './material.imports';
import { rootRoutes } from './routes';
import { FilesService } from './services/files.service';
import { ProjectsService } from './services/projects.service';
import { ToastService } from './services/toast.service';
import { UserService } from './services/user.service';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminPanelUserComponent } from './components/admin-panel-user/admin-panel-user.component';
import { AdminPanelInvestorsComponent } from './components/admin-panel-investors/admin-panel-investors.component';

export const firebaseConfig = environment.FirebaseConfig;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProjectsListComponent,
    EditProjectComponent,
    AddProjectComponent,
    RegisterComponent,
    SingleProjectCardComponent,
    ProjectDetailsComponent,
    ContainerComponent,
    DonationBoxComponent,
    AdminPanelComponent,
    AdminPanelUserComponent,
    AdminPanelInvestorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    YoutubePlayerModule,
    CommonModule,
    FlexLayoutModule,
    materialImports,
    FormsModule,
    SlideshowModule,
    NgxMaterialTimepickerModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    RouterModule.forRoot(rootRoutes)
  ],
  entryComponents: [DonationBoxComponent],
  providers: [
    UserService,
    ProjectsService,
    FilesService,
    AngularFireAuth,
    AngularFireDatabase,
    AngularFireStorage,
    ToastService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
