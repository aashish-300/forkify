export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    resultList: document.querySelector('.results__list'),
    loader: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likeMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list'),
}

export const elementsLoader = {
    loader: 'loader',
}

export const renderLoader = parent => {
    const html = `
        <div class="${elementsLoader.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div`

    parent.insertAdjacentHTML('afterbegin', html);
}

export const clearLoader = () => {
    const  loader = document.querySelector(`.${elementsLoader.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}