import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { ProjectCardComponent } from './components/project-card/project-card.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { DashboardProjectComponent } from './components/dashboard-project/dashboard-project.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
// import { CommentBoxComponent } from './components/components/comment-box/comment-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProjectCardComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProjectPageComponent,
    CreateProjectComponent,
    ProfilePageComponent,
    CommentBoxComponent,
    DashboardPageComponent,
    PageContainerComponent,
    DashboardProjectComponent,
    StatsPageComponent,
    // CommentBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    MatGridListModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
