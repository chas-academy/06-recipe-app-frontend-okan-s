import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private http: HttpClient
    ) {}

  yummlyBaseUrl(id?){
    const yummlyAppID = "e2545941";
    const yummlyApiKey = "a66e8174065d10baf98992e7d62b9741";
    
    if (typeof id === 'undefined') {
      const yummlyPath = "http://api.yummly.com/v1/api/recipes?";
      const yummlyParams = 
        `_app_id=${yummlyAppID}`
      + `&_app_key=${yummlyApiKey}
      `;
      return `${yummlyPath}${yummlyParams}`;
   } else {
      const yummlyPath = "http://api.yummly.com/v1/api/recipe/";
      const yummlyParams = 
        `${id}?`
      + `_app_id=${yummlyAppID}`
      + `&_app_key=${yummlyApiKey}
      `;
      return `${yummlyPath}${yummlyParams}`;
   }
  }

  getRecipes(searchOptions): Observable<[]> {
    return this.http.get<any>(`${this.yummlyBaseUrl()}&q=${searchOptions}`);
  }

  getRecipe(id): Observable<any> {
    return this.http.get<any>(this.yummlyBaseUrl(id));
  }


}
