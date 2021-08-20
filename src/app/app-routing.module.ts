import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfileEditPageComponent } from './pages/profile-edit-page/profile-edit-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProjectEditPageComponent } from './pages/project-edit-page/project-edit-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'app/:id',
    component: ProjectPageComponent
  },
  {
    path: 'app/edit/:id',
    component: ProjectEditPageComponent
  },
  {
    path: 'create',
    component: CreateProjectComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
  {
    path: 'profile/:id',
    component: ProfilePageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'stats/:id',
    component: StatsPageComponent
  },
  {
    path: 'settings/profile',
    component: ProfileEditPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
