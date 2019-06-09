import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';
import { PlansComponent } from './components/plans/plans.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RolesComponent } from './components/roles/roles.component';

const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'plans',
    component: PlansComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'getstarted',
    component: GettingStartedComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'null',
    redirectTo:  'home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo:  'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
