import { toast } from 'react-toastify';

class AppNotificationStore {
  _messageText(message) {
    return typeof message === 'object' ? message.message : message;
  }

  _createNotification(message, type) {
    toast(this._messageText(message), { type });
  }

  info(message) {
    this._createNotification(message, toast.TYPE.INFO);
  }

  warning(message) {
    this._createNotification(message, toast.TYPE.WARNING);
  }

  error(message) {
    this._createNotification(message, toast.TYPE.ERROR);
  }

  success(message) {
    this._createNotification(message, toast.TYPE.SUCCESS);
  }
}

export default new AppNotificationStore();