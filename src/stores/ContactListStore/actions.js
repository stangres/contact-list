import appLoaderStore from '../ui/AppLoaderStore';
import appNotificationStore from '../ui/AppNotificationStore';
import contactListStore from '../ContactListStore';

export async function loadContacts() {
  try {
    appLoaderStore.toLoading();
    await contactListStore.load();
  } catch (error) {
    appNotificationStore.error(error);
  }
  finally {
    appLoaderStore.toLoaded();
  }
}

export async function addContact() {
  try {
    await contactListStore.add();
  } catch (error) {
    appNotificationStore.error(error);
  }
}

export async function deleteContact(id) {
  try {
    await contactListStore.delete(id);
  } catch (error) {
    appNotificationStore.error(error);
  }
}

export function setSearch(value) {
  contactListStore.setSearch(value);
}