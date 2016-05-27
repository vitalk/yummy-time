'use strict';

const nodemailer = require('nodemailer');

const Order = require('../models/order');
const config = require('../../config/config');

function sendEmail(email, message) {
  const transporter = nodemailer.createTransport(config.smtp);

  const mailOptions = {
    from: config.systemEmail,
    to: email,
    subject: 'Notification',
    text: message
  };

  transporter.verify(error => {
    if (error) {
      console.log(error); // eslint-disable-line no-console
    } else {
      transporter.sendMail(mailOptions, (err, info) => {
        if (error) {
          console.log(err); // eslint-disable-line no-console
        } else {
          console.log(`Message sent: ${info.response}`); // eslint-disable-line no-console
        }
      });
    }
  });
}

exports.connection = function(io) {
  io.sockets.on('connection', socket => {
    socket.on('join', data => {
      socket.join(data.room);
    });

    socket.on('leave', data => {
      socket.leave(data.room);
    });

    socket.on('send message', data => {
      socket.broadcast.to(data.order).emit('message', { msg: data.message });

      const recipients = [];
      Order
        .findById(data.orderId)
        .populate('manager')
        .populate({
          path: 'portions',
          model: 'Portion',
          populate: {
            path: 'owner',
            model: 'Account'
          }
        })
        .exec((err, order) => {
          order.portions.forEach(item => {
            const recipient = item.owner.email;
            if (order.manager.email !== recipient &&
                recipients.indexOf(recipient) === -1) {
              recipients.push(recipient);
            }
          });

          recipients.forEach(recipient => {
            sendEmail(recipients, data.message);
          });
        });
    });

    socket.on('get orders', data => {
      const orders = [];
      Order
        .find()
        .populate({
          path: 'portions',
          model: 'Portion',
          populate: {
            path: 'owner',
            model: 'Account'
          }
        })
        .exec((err, order) => {
          order.forEach(item => {
            const portions = item.portions;
            for (let i = 0; i < portions.length; i++) {
              if (portions[i].owner !== undefined && portions[i].owner.email === data.email) {
                orders.push(item.id);
                break;
              }
            }
          });

          io.sockets.in(data.email).emit('orders', { orders });
        });
    });
  });
};
