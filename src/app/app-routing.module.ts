import { ProfileComponent } from './components/user/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FavoritesComponent } from './components/user/favorites/favorites.component';
import { LoginComponent } from './components/user/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RegisterComponent } from './components/user/register/register.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent
  },

  {
    path: 'recipe/:id',
    component: RecipeDetailComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
