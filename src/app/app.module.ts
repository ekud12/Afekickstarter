import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { materialImports } from './material.imports';
import { rootRoutes } from './routes';
import { FilesService } from './services/files.service';
import { UserService } from './services/user.service';

export const firebaseConfig = environment.FirebaseConfig;
@NgModule({
  declarations: [AppComponent, LoginComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    materialImports,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    RouterModule.forRoot(rootRoutes)
  ],
  providers: [UserService, FilesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
