import { observable, action, computed, decorate, runInAction } from 'mobx';
import axios from 'axios';
import ContactModel from './model';
import { CONTACTS, CONTACT_ID } from '../../urls';
import { createUrl } from '../../utils';

class ContactListStore {
  data = [];
  searchValue = '';

  _indexById(id) {
    return this.data.findIndex(item => item.id === id);
  }

  get items() {
    if (this.searchValue === '') {
      return this.data;
    }

    return this.data.filter(item => item.contains(this.searchValue));
  }

  async load() {
      const response = await axios.get(CONTACTS);

      runInAction(() => {
        this.data = response.data.map(item => new ContactModel(item.id, this));
      });

    return true;
  }

  async add() {
    let result = false;

    try {
      const response = await axios.post(CONTACTS);

      runInAction(() => {
        this.data.push(new ContactModel(response.data.id, this));
      });

      result = true;
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  async delete(id) {
    let result = false;

    try {
      const url = createUrl(CONTACT_ID, id);
      const index = this._indexById(id);

      if (index !== -1) {
        await axios.delete(url);

        runInAction(() => {
          this.data.remove(this.data[index]);
          //this.data.splice(index, 1);
        });

        result = true;
      }
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  setSearch(value) {
    this.searchValue = value;
  }
}

decorate(ContactListStore, {
  data: observable.shallow,
  searchValue: observable,
  items: computed,
  load: action,
  add: action,
  delete: action,
  setSearch: action
});

export default new ContactListStore();