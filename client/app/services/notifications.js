import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({
  socketService: Ember.inject.service('socket-io'),
  session: Ember.inject.service(),

  getSocket() {
    return this.get('socketService').socketFor(ENV.host);
  },

  setNotificationCookie(orderId) {
    const isCookieExists = this.getIfNotificationCookieSet(orderId);
    if (!isCookieExists) {
      const oneDay = 1 * 24 * 60 * 60 * 1000;
      const date = new Date();
      date.setTime(date.getTime() + oneDay);
      document.cookie =
        `ROOMS_JOINED_${orderId}=${orderId}; expires=${date.toGMTString()}; path=/`;
    }
  },

  removeNotificationCookie(orderId) {
    const isCookieExists = this.getIfNotificationCookieSet(orderId);
    if (isCookieExists) {
      const oneDay = 1 * 24 * 60 * 60 * 1000;
      const date = new Date();
      date.setTime(date.getTime() - oneDay);
      document.cookie = `ROOMS_JOINED_${orderId}=; expires=${date.toGMTString()}`;
    }
  },

  getIfNotificationCookieSet(orderId) {
    const name = `ROOMS_JOINED_${orderId}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return true;
      }
    }
    return false;
  },

  getOrdersFromCookies() {
    const connectedOrders = [];
    const name = 'ROOMS_JOINED_';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        cookie = cookie.substring(name.length, cookie.length);
        const divider = '=';
        if (cookie.indexOf(divider) > 0) {
          const order = cookie.substring(cookie.indexOf(divider) + 1, cookie.length);
          connectedOrders.push(order);
        }
      }
    }
    return connectedOrders;
  },

  requestUserOrders(email) {
    const socket = this.getSocket();
    socket.emit('get orders', { email });
  },

  joinToPrivateSession(email) {
    const socket = this.getSocket();
    socket.emit('join', { room: email });
  },

  sendOrderNotification(message, orderId) {
    const socket = this.getSocket();
    socket.emit('send message', { message, orderId });
  },

  subscribeOrderNotification(orderId) {
    this.setNotificationCookie(orderId);
    const socket = this.getSocket();
    socket.emit('join', { room: orderId });
  },

  subscribeNotifications() {
    const orders = this.getOrdersFromCookies();
    const this_ = this;
    orders.forEach(item => {
      this_.subscribeOrderNotification(item);
    });
  },

  subscribeNotificationsOnLogin(email) {
    this.joinToPrivateSession(email);
    this.requestUserOrders(email);
  },

  unsubscribeFromOrderNotifications() {
    const socket = this.getSocket();
    const this_ = this;
    const orders = this.getOrdersFromCookies();
    orders.forEach(item => {
      socket.emit('leave', { room: item });
      this_.removeNotificationCookie(item);
    });
  },

  createNotification(options) {
    const notification = new Notification('Yummy Time', options);
    notification.onclick = function(event) {
      event.preventDefault();
      notification.close();
    };
  },

  init(email) {
    this._super.apply(this);
    const socket = this.getSocket();

    socket.on('message', data => {
      const options = {
        body: data.msg,
        icon: 'assets/img/notify-icon.jpg'
      };

      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          this.createNotification(options);
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission(permission => {
            if (permission === 'granted') {
              this.createNotification(options);
            }
          });
        }
      }
    }, this);

    socket.on('orders', function(data) {
      const this_ = this;
      data.orders.forEach(orderId => {
        this_.subscribeOrderNotification(orderId);
      });
      socket.emit('leave', { room: email });
    }, this);
  }
});
