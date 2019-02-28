import { RecipeService } from 'src/app/services/recipe.service';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.getFavorites()
    
  }

  details: any
  getFavorites() {
    this.auth.showFavorites().subscribe(
      favorites => {
        this.details = favorites
        this.detailRecipe()
      },
      err => {
        console.error(err)
      }
    )
  }

  recipes: any
  detailRecipe() {
    let arr = []
    for (let i = 0; i < this.details.favorites.length; i++) { 
      this.recipeService.getRecipe(this.details.favorites[i].recipeID).subscribe(data => {
        if (data.id == this.details.favorites[i].recipeID) {
          arr[i] = data
        }
      })
    }
    this.recipes = arr
    
  }

}
