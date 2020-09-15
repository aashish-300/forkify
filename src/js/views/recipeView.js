import {elements} from './base'
import {Fraction} from 'fractional'


export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}


const formatCount = c => {
    if(c){
        const [int,dec] = c.toString().split('.').map(e => parseInt(e));
        if(!dec) return c;

        if(int === 0) {
            const fr = new Fraction(c);
            const num = String(fr.numerator).charAt(0);
            let dem = parseInt(String(fr.denominator).charAt(0));
            if(fr.denominator > 10) dem = String(fr.denominator).slice(0,2);

            return `${num}/${dem}`;
        }else{
            const fr = new Fraction(c-int);
            const num = String(fr.numerator).charAt(0);
            let dem = parseInt(String(fr.denominator).charAt(0));
            if(fr.denominator > 10) dem = String(fr.denominator).slice(0,2);
            return `${int} ${num}/${dem}`;
        }
    }
    return '?';
}


const renderIngredients = e => `           
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(e.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${e.unit}</span>
            ${e.name}
        </div>
    </li>`;

export const renderRecipe = (recipe , isLiked) => {
    console.log(`is liked ${isLiked}`);
    const markup = ` 
<figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
    <h1 class="recipe__title">
        <span>${recipe.title}</span>
    </h1>
</figure>
<div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
        <span class="recipe__info-text"> Minutes</span>
    </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
            <button class="btn-tiny btn-decrease">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                </svg>
            </button>
            <button class="btn-tiny btn-increase">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                </svg>
            </button>
        </div>

    </div>
    <button class="recipe__love">
        <svg class="header__likes">
            <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
        </svg>
    </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(el => renderIngredients(el)).join('')}
        </ul>

        <button class="btn-small recipe__btn btn-addItem">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
    </p>
    <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>

    </a>
    </div>`;

    elements.recipe.insertAdjacentHTML('afterbegin', markup);

};


export const updateServingIngredient = recipe => {
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    const count = Array.from(document.querySelectorAll('.recipe__count'));
    count.forEach((e,i) => {
        e.textContent = formatCount(recipe.ingredients[i].count);
    } )
}