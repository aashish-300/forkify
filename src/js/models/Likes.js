export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id,image,author,title){
        const like = {id,image,author,title};
        this.likes.push(like);
       
        //persit data in local storage
        this.persistData();
       
        return like;

    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index,1);

        //persist data in local storage
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLiked() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes' ,JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if(storage) this.likes = storage;
    }
}