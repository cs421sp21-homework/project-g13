import { extendObservable } from 'mobx';

/*
 * User store
 */

class UserStore {
    constructor() {
        extendObservable(this, {

            loading: false, //idk?
            isLoggedIn: false,
            username: 'Guest'

        })
    }
}

export default new UserStore();