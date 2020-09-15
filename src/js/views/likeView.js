import { elements } from './base'

export const toggleLike = isLiked => {
    const icon = isLiked ? '' : '-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#icon-heart${icon}`);

}

export const toggleLikeMenu = getNum => {
    console.log(elements.likeMenu);
    elements.likeMenu.style.visibility = getNum > 0 ? 'visible' : 'hidden';
}

export const renderLike = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                <img src="${like.image}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${like.title}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>`;

    elements.likesList.insertAdjacentHTML('beforeend' , markup);
}


export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    el.parentElement.removeChild(el);
} 