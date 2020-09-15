import { elements } from './base'

export const getInput = () => elements.searchInput.value;

export const clearSearch = () => {
    elements.searchInput.value = '';
}

export const clearList = () => {
    elements.resultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

const limitTitle = (title,limit =  17) => {
    if(title.length > limit) {
        const newTitle =[];
        title.split(' ').reduce((acc,cur) => {
            if(acc+cur.length < limit){
                newTitle.push(cur);
            }
            return acc+cur.length;
        },0)
        console.log(newTitle);
        return `${newTitle.join(' ')}...`;
    }
    return title;
}


export const searchHighLight = id => {
    const arr = Array.from(document.querySelectorAll('.results__link'))
    arr.forEach(el => el.classList.remove('results__link--active'));
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}


const renderRecipe = recipes => {
    const html = `  
    <li>
        <a class="results__link " href="#${recipes.id}">
            <figure class="results__fig">
                <img src="${recipes.image}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitTitle(recipes.title)}</h4>
                <p class="results__author">The Pioneer Woman</p>
            </div>
        </a>
    </li>`
    // console.log(recipes.title);
    elements.resultList.insertAdjacentHTML('beforeend', html);
}

const createButton = (page, type) => `
            <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
                <span>Page ${type === 'prev' ? page-1 : page+1}</span>
                <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                </svg>
            </button>`
;

const renderButtons = (page,numResults,renderPerPage) => {
    const pages = Math.ceil(numResults/renderPerPage);
    // console.log(pages);
    let button;
    if(page === 1 && pages > 1){
        //render only buttons to go next page
        button = createButton(page, 'next');
    }
    else if(page < pages) {
        //render both buttons
        button = `${createButton(page, 'prev')}
                  ${createButton(page,'next')}`;
    }
    else if(page === pages && pages > 1){
        //render only buttons to go previous page
        button = createButton(page,'prev');
    }
    if(pages >1) {
        elements.searchResPages.insertAdjacentHTML('afterbegin' , button);
    }
}


export const renderResults = (recipes , page = 1, pagePerRender = 10) => {
    //render items on each page
    const start = (page - 1 ) * pagePerRender;
    const end = page * pagePerRender;
    recipes.slice(start,end).forEach(renderRecipe);
    // console.log(`we are in page : ${page}`);

    //render pagination
    renderButtons(page,recipes.length, pagePerRender);
}