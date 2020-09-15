import Search from './models/Search'
import List from './models/List'
import Likes from './models/Likes'
import * as likeView from './views/likeView'
import * as  listView from './views/listView'
import { elements , renderLoader , clearLoader, elementsLoader} from './views/base'
import * as searchView from './views/searchView'
import Recipe from './models/Recipe'
import * as recipeView from './views/recipeView'


//Global storage
const state = {};

//search controller
const controlSearch = async() => {
    //1.get query from searchView
    const query = searchView.getInput();

    if(query){
        //2. if query is done search new search object and add to state
        state.search = new Search(query);
    
        //3.prepare UI for results
        searchView.clearSearch();
        searchView.clearList();
        renderLoader(elements.loader);
        try{
            //4.search for recipes
            await state.search.getResults();

            //5.render results to UI
            clearLoader();
            searchView.renderResults(state.search.results);
            console.log(state.search.results);
        }catch{
            alert('something goes wrong!');
            clearLoader();
        }
}

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goto =  parseInt(btn.dataset.goto, 10);
        searchView.clearList();
        searchView.renderResults(state.search.results,goto);
    }
    // console.log(e.target.closest('.btn-inline'));
})


// RECIPE CONTROLLER

const controlRecipe= async () => {
    const id = window.location.hash.replace('#','');
    console.log(id);

    if(id){
        //prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //highlight search part
        if (state.search) searchView.searchHighLight(id);

        //create new recipe object
        state.recipe = new Recipe(id);
        
        try{
        
            //get recipe data
            await state.recipe.getRecipe();

            //testing
            state.recipe.parseIngredients();
            console.log(state.recipe);
        
            //render recipe
            recipeView.renderRecipe(state.recipe , state.like.isLiked(id));
            clearLoader();

        }
        catch(error){
            alert (error);
            recipeView.clearRecipe();
            clearLoader();
        }
    }
}

['hashchange' , 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// LIST CONTROLLER
const controlList = () => {
    //create list if it not created
    if(!state.list) state.list = new List();

    //add all ingredients to shopping list and UI
    state.recipe.ingredients.forEach(e => {
       const item = state.list.addItem(e.count , e.unit , e.name);
       listView.renderItem(item);
    })
}

//delete item from shopping list
elements.shopping.addEventListener('click' , e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    const btn = e.target.matches('.btn-deleteItem , .btn-deleteItem *'); 
    if(btn) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
    }else if(e.target.matches('.shopping__count--value')) {
        state.list.updateCount(id , parseFloat(e.target.value));
    }
})


//TESTING
state.like = new Likes();
likeView.toggleLikeMenu(state.like.getNumLiked());

//LIKE CONTROLLER
const controlLike = () => {
    //if like is not created then create new one
    if(!state.like) state.like = new Likes();

    const curId = state.recipe.id;
    //user hasn't liked
    if(!state.like.isLiked(curId)){
        //add new like to store
        const newLike = state.like.addLike(curId,state.recipe.image,'jonas',state.recipe.title);

        //Toggle like 
        likeView.toggleLike(true);

        //add like to UI
        likeView.renderLike(newLike);
        console.log(state.like);
    }
    else{
        //remove like from store
        state.like.deleteLike(curId);

        //TOGGLE LIKE
        likeView.toggleLike(false);

        //remove like from UI
        likeView.deleteLike(curId);
        console.log(state.like);
    }
    console.log(state.like.getNumLiked());
    likeView.toggleLikeMenu(state.like.getNumLiked());
}


window.addEventListener('load' , () => {
    state.like = new Likes();

    //restore like from local storage
    state.like.readStorage();

    //TOggle like menu button
    likeView.toggleLikeMenu(state.like.getNumLiked());

    //render existing likes
    state.like.likes.forEach(e => likeView.renderLike(e));
})

// SERVICE CONTROLLER
elements.recipe.addEventListener('click' , e => {
    e.preventDefault();
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {
        state.recipe.updateServings('dec')   
    }
    else if(e.target.matches('.btn-increase, .btn-increase *')) {
       state.recipe.updateServings('inc');
    }else if(e.target.matches('.btn-addItem , .btn-addItem *')) {
        controlList();
    }else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
    recipeView.updateServingIngredient(state.recipe);
})


window.state = state;