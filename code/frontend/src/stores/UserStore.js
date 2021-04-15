//import { extendObservable } from 'mobx';

/*
 * User store
 */

class UserStore {
    constructor() {
        //extendObservable(this, {

            //loading: false, //idk?
            this.isLoggedIn = false;
            this.username = 'Guest';

        //})
    }

    setIsLoggedIn(value) {
        this.isLoggedIn = value;
    }

    getIsLoggedIn() {
        return this.isLoggedIn;
    }

    setUsername(value) {
        this.username = value;
    }

    getUsername() {
        return this.username;
    }
}

const userStore = new UserStore();
export default userStore;