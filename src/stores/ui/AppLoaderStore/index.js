import { observable, action, decorate } from 'mobx';

class AppLoaderStore {
  isLoading = false;

  toLoaded() {
    this.isLoading = false;
  }

  toLoading() {
    this.isLoading = true;
  }
}

decorate(AppLoaderStore, {
  isLoading: observable,
  toLoaded: action,
  toLoading: action
});

export default new AppLoaderStore();