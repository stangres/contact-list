import { observable, action, decorate, runInAction, toJS } from 'mobx';
import axios from "axios";
import { ALL, NAMES, NAME_ID, PHONES, PHONE_ID, EMAILS, EMAIL_ID, SOCIALS, SOCIAL_ID } from '../../urls';
import { createUrl } from '../../utils';

export default class ContactItemModel {
  store;
  editMode = false;

  id;
  nameItem = {
    contactId: null,
    id: null,
    name: ''
  };
  phones = [];
  emails= [];
  socials = [];

  constructor(id, store) {
    this.id = id;
    this.store = store;
  }

  setEditMode(mode) {
    this.editMode = mode;
  }

  searchFunction(str, value) {
    return str.toLowerCase().startsWith(value.toLowerCase());
  }

  contains(value) {
    return this.searchFunction(this.nameItem.name, value) ||
           this.phones.find(el => this.searchFunction(el.phone, value)) ||
           this.emails.find(el => this.searchFunction(el.email, value)) ||
           this.socials.find(el => this.searchFunction(el.url, value));
  }

  getRandomTimeout(min, max) {
    return Math.random() * (max - min) + min;
  }

  async load() {
    let result = false;

    try {
      const url = createUrl(ALL, this.id);
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(axios.get(url));
        }, this.getRandomTimeout(100, 500))
      });

      runInAction(() => {
        this._fromRawData(response.data);
      });

      result = true;
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  _fromRawData(data) {
    if (typeof data === 'object' &&
        Object.keys(data).length) {
      this.id = data.id;

      let names = data.names || [];
      if (names.length)
        this.nameItem = names[0];

      let phones = data.phones || [];
      if (phones.length)
        this.phones = phones;

      let emails = data.emails || [];
      if (emails.length)
        this.emails = emails;

      let socials = data.socials || [];
      if (socials.length)
        this.socials = socials;
    }
  }

  async updateName(name) {
    let result = false;

    try {
      const url = createUrl(NAME_ID, this.nameItem.id);

      const data = Object.assign(toJS(this.nameItem), { name });
      await axios.put(url, data);

      runInAction(() => {
        this.nameItem.name = name;
      });

      result = true;

    } catch (error) {
      console.error(error);
    }

    return result;
  }

  async addName(name) {
    let result = false;

    try {
      const data = { contactId: this.id, name };
      const response = await axios.post(NAMES, data);

      runInAction(() => {
        this.nameItem = response.data;
      });

      result = true;
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  _indexById(data, id) {
    return data.findIndex(item => item.id === id);
  }

  async updatePhone(id, phone) {
    let result = false;

    try {
      const url = createUrl(PHONE_ID, id);
      const index = this._indexById(this.phones, id);

      if (index !== -1) {
        const data = Object.assign(toJS(this.phones[index]), {phone});
        await axios.put(url, data);

        runInAction(() => {
          this.phones[index].phone = phone;
        });

        result = true;
      }
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  async addPhone(phone) {
    let result = false;

    try {
      const data = { contactId: this.id, phone };
      const response = await axios.post(PHONES, data);

      runInAction(() => {
        this.phones.push(response.data);
      });

      result = true;
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  async deletePhone(id) {
    let result = false;

    try {
      const url = createUrl(PHONE_ID, id);
      const index = this._indexById(this.phones, id);

      if (index !== -1) {
        await axios.delete(url);

        runInAction(() => {
          this.phones.splice(index, 1);
        });

        result = true;
      }
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  async updateEmail(id, email) {
    let result = false;

    try {
      const url = createUrl(EMAIL_ID, id);
      const index = this._indexById(this.emails, id);

      if (index !== -1) {
        const data = Object.assign(toJS(this.emails[index]), {email});
        await axios.put(url, data);

        runInAction(() => {
          this.emails[index].email = email;
        });

        result = true;
      }
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  async addEmail(email) {
    let result = false;

    try {
      const data = { contactId: this.id, email };
      const response = await axios.post(EMAILS, data);

      runInAction(() => {
        this.emails.push(response.data);
      });

      result = true;
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  async deleteEmail(id) {
    let result = false;

    try {
      const url = createUrl(EMAIL_ID, id);
      const index = this._indexById(this.emails, id);

      if (index !== -1) {
        await axios.delete(url);

        runInAction(() => {
          this.emails.splice(index, 1);
        });

        result = true;
      }
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  async updateSocial(id, urlAddress) {
    let result = false;

    try {
      const url = createUrl(SOCIAL_ID, id);
      const index = this._indexById(this.socials, id);

      if (index !== -1) {
        const data = Object.assign(toJS(this.socials[index]), {url: urlAddress});
        await axios.put(url, data);

        runInAction(() => {
          this.socials[index].url = urlAddress;
        });

        result = true;
      }
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  async addSocial(url) {
    let result = false;

    try {
      const data = { contactId: this.id, url };
      const response = await axios.post(SOCIALS, data);

      runInAction(() => {
        this.socials.push(response.data);
      });

      result = true;
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  async deleteSocial(id) {
    let result = false;

    try {
      const url = createUrl(SOCIAL_ID, id);
      const index = this._indexById(this.socials, id);

      if (index !== -1) {
        await axios.delete(url);

        runInAction(() => {
          this.socials.splice(index, 1);
        });

        result = true;
      }
    } catch (error) {
      console.error(error);
    }

    return result;
  }


  destroy() {
    this.store.remove(this);
  }
}

decorate(ContactItemModel, {
  editMode: observable,
  setEditMode: action,
  nameItem: observable,
  phones: observable,
  emails: observable,
  socials: observable,
  load: action,
  _fromRawData: action,
  updateName: action.bound,
  addName: action.bound,
  updatePhone: action.bound,
  addPhone: action.bound,
  deletePhone: action.bound,
  updateEmail: action.bound,
  addEmail: action.bound,
  deleteEmail: action.bound,
  updateSocial: action.bound,
  addSocial: action.bound,
  deleteSocial: action.bound
});