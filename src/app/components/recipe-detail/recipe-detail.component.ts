import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.detailRecipe()
    this.alreadyFavorited()
  }

  id = this.route.snapshot.paramMap.get('id')
  recipe: []
  detailRecipe() {
    this.recipeService.getRecipe(this.id).subscribe(data => {
      this.recipe = data
    })
  }

  lastAction: any //disable button spam
  favoriteRecipe() {
    if (this.lastAction == "favorite") {
      return
    }
    this.lastAction = "favorite"
    this.auth.storeFavorite(this.id).subscribe(
      response => {
        this.alreadyFavorited()
      },
      err => {
        console.error(err)
      }
    )
  }

  unfavoriteRecipe() {
    if (this.lastAction == "unfavorite") {
      return
    }
    this.lastAction = "unfavorite"
    this.auth.deleteFavorite(this.id).subscribe(
      response => {
        this.alreadyFavorited()
      },
      err => {
        console.error(err)
      }
    )
  }

  already: boolean
  alreadyFavorited() {
    this.auth.checkFavorite(this.id).subscribe(
      response => {
        if (response.favorited == true) {
          this.already = true
        } else {
          this.already = false
        }
      },
      err => {
        console.error(err)
      }
    )
  }

}
