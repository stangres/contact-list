import appNotificationStore from '../../stores/ui/AppNotificationStore';
import authStore from '../../stores/AuthStore';

export async function authenticate({ username, password }) {
  let result = false;

  try {
    if (!authStore.isAuthenticated) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin' &&
            password === 'admin') {
            resolve();
          } else {
            reject('Неверное имя пользователя или пароль !');
          }
        }, 500)
      });
      authStore.authenticate(username);
      result = true;
    }
    else {
      result = true;
    }
  } catch (error) {
    appNotificationStore.error(error);
  }

  return result;
}

export async function unauthenticate() {
  let result = false;

  try {
    await new Promise((resolve) => {
      setTimeout(() => {
          resolve();
      },500)
    });
    authStore.unauthenticate()
    result = true;
  } catch (error) {
    appNotificationStore.error(error);
  }

  return result;
}