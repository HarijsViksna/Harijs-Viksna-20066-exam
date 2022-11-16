import { reactive } from 'vue'
import router from '/src/router/index.js';

export const auth = reactive({
    user: {
        name: localStorage.getItem("name") ?? "Harijs",
        surname: localStorage.getItem("surname") ?? "Viksna",
        code: localStorage.getItem("code") ?? "IT20066",
        favorite_songs: JSON.parse(localStorage.getItem("myFavouriteSongs")) ?? []
    },

    is_authenticated: localStorage.is_authenticated ?? false,

    setUserData(name, surname, code){
        this.user.name = name;
        this.user.surname = surname;
        this.user.code = code;
    },

    authenticate(email, password){
        if(email == "harijs.viksna@va.lv" && password == "123456"){
            localStorage.is_authenticated = true;
            this.is_authenticated = true;
            router.replace('/')
        }
    },

    logout(){
        localStorage.clear();
        this.is_authenticated = false;
        router.replace('/login')
    },

    toggleFavorite(songID){
        let index = this.user.favourite_songs.indexOf(songID);

        if (this.user.favorite_songs.includes(songID) == false) {
            this.user.favorite_songs.push(songID);
        } else {
            this.user.favorite_songs.splice(index, 1);
        }
        localStorage.setItem("myFavouriteSongs", JSON.stringify(this.user.favorite_songs));
    },

    getFavoriteSongs(){
        return this.user.favorite_songs;
    }
});