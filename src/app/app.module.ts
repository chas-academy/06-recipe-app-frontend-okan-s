import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule, MatListModule, MatCheckboxModule, MatCardModule, MatSelectModule, MatRadioModule, MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatToolbarModule } from '@angular/material';
import { MainNavComponent } from './components/layout/main-nav/main-nav.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { FavoritesComponent } from './components/user/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RegisterComponent,
    LoginComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
