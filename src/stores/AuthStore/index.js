import { observable, action, computed, decorate } from 'mobx';

const storage = window.localStorage;

class AuthStore {
  key = 'username';
  user = storage.getItem(this.key);

  get isAuthenticated() {
    return !!(this.user);
  }

  authenticate(username) {
    storage.setItem(this.key, username);
    this.user = username;
  }

  unauthenticate() {
    storage.removeItem(this.key);
    this.user = null;
  }

  get username() {
    return this.user;
  }
}

decorate(AuthStore, {
  user: observable,
  isAuthenticated: computed,
  authenticate: action,
  unauthenticate: action,
  username: computed
});

export default new AuthStore();