import axios from 'axios'
import {api} from '../config'

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        try{
            const res = await axios.get(`https://api.spoonacular.com/recipes/${this.id}/information?&apiKey=${api}`);
            const recipe = res.data;
            this.title = recipe.title;
            this.image = recipe.image;
            this.summary = recipe.summary;
            this.ingredients = recipe.extendedIngredients;
            this.servings = recipe.servings;
            this.time = recipe.readyInMinutes;
            this.url = recipe.sourceUrl;
            console.log(recipe);
            
        }
        catch(error){
            alert(error);
            console.log(error);
        }
    }

    parseIngredients() {
      const newIngredients = this.ingredients.map(el => {
        let ingredient = {};

        ingredient.count = el.amount;
        ingredient.unit = el.measures.metric.unitShort;
        ingredient.name = el.name;

        return ingredient;

      });
      this.ingredients = newIngredients;
    }

    updateServings(type) {
        // SERVINGS
        if(this.servings > 1) {
            const newServings = type === 'dec' ? this.servings-1 : this.servings+1;
            
        // INGREDIENT COUNT
        this.ingredients.forEach(e => e.count = e.count/this.servings * newServings);

        this.servings = newServings;
        }
    }
}