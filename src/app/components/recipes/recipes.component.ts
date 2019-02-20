import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: []

  constructor(
    private recipeService: RecipeService,
  ) { }

  ngOnInit(){}

  searchRecipes(value) {
    var selectedOptionsFinal = ""
    if (value.form.value.searchValue){
      selectedOptionsFinal += value.form.value.searchValue
    }
    if (value.form.value.selectedCourse){
      selectedOptionsFinal += value.form.value.selectedCourse
    }
    if (value.form.value.selectedAllergens){
      selectedOptionsFinal += value.form.value.selectedAllergens.join("")
    }
    if (value.form.value.selectedDiets){
      selectedOptionsFinal += value.form.value.selectedDiets.join("")
    }

    this.recipeService.getRecipes(selectedOptionsFinal).subscribe(data => {
      this.recipes = data.matches;
    })
  }

}
