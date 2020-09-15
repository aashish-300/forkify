import axios from 'axios'
import {api} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults(){

        
        try{
            const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&apiKey=${api}`);
            const recipe = res.data.results;
            this.results = recipe;
            // console.log(this.results);
        } catch(error){
            alert(error);
        }
    }
}