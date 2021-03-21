import { extendObservable } from 'mobx';

/*
 * User store
 */

class UserStore {
    constructor() {
        extendObservable(this, {

            loading: true,
            isLoggedIn: false,
            username: ''

        })
    }
}

export default new UserStore();